import { pool } from '../../../../infrastructure/database/db.js';
import ApiError from '../../../../utils/api.error.js';
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from '../../../../utils/cloudinary.storage.js';
import { withTransaction } from '../../../../utils/transaction.js';
import ERROR_CONFIG from './error.config.js';
import * as repository from './repository.js';

export async function getVenueDetails(venueId, vendorId) {
  const venue = await repository.fetchVenue(venueId, vendorId);

  if (!venue) {
    throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
  }

  const reverification =
    await repository.fetchReverificationApplication(venueId);

  return { venue, reverification };
}

export async function uploadCoverImage(vendorId, venueId, file) {
  try {
    const venue = await repository.getCoverImage(vendorId, venueId);

    if (!venue) {
      throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
    }

    const coverImageId = `venues/${vendorId}/${venueId}/cover_image`;
    await uploadToCloudinary(file.buffer, coverImageId);

    if (!venue.has_cover_image) {
      return await repository.updateCoverImage(vendorId, venueId);
    }
  } catch (err) {
    if (err instanceof ApiError) throw err;

    throw new ApiError(ERROR_CONFIG.FILE_UPLOAD_FAILED);
  }
}

export async function uploadVenueImages({
  vendorId,
  venueId,
  deleteIds,
  files,
}) {
  try {
    const dbImages = await repository.getVenueDetailsImages(vendorId, venueId);

    if (!dbImages) {
      throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
    }

    const deleteFiles = deleteIds.map(
      (id) => `venues/${vendorId}/${venueId}/venue_image-${id}`
    );

    const invalidDeleteFiles = deleteFiles.filter(
      (file) => !dbImages.includes(file)
    );

    if (invalidDeleteFiles.length > 0) {
      throw new ApiError(ERROR_CONFIG.INVALID_IMAGE_ID);
    }

    const finalCount = dbImages.length + files.length - deleteFiles.length;

    if (finalCount > 10) {
      throw new ApiError(ERROR_CONFIG.FILE_UPLOAD_LIMIT_EXCEEDED);
    }

    for (const file of deleteFiles) {
      await deleteFromCloudinary(file);
    }

    const uploadFiles = [];

    for (const file of files) {
      const path = `venues/${vendorId}/${venueId}/venue_image-${crypto.randomUUID()}`;

      await uploadToCloudinary(file.buffer, path);

      uploadFiles.push(path);
    }

    const finalFiles = [
      ...dbImages.filter((image) => !deleteFiles.includes(image)),
      ...uploadFiles,
    ];

    return await repository.updateVenueDetailsImages({
      vendorId,
      venueId,
      finalFiles,
    });
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(ERROR_CONFIG.FILE_UPLOAD_FAILED);
  }
}

export async function updateVenueDetailsDetails(vendorId, venueId, data) {
  return withTransaction(pool, async (client) => {
    const venue = await repository.fetchVenueDetails(client, vendorId, venueId);
    if (!venue) {
      throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
    }
    try {
      return await repository.insertIntoVenueReverification(client, {
        ...venue,
        ...data,
      });
    } catch (err) {
      if (
        err.code === '23505' &&
        err.constraint === 'unique_pending_venue_reverification'
      ) {
        throw new ApiError(ERROR_CONFIG.REVERIFICATION_ALREADY_PENDING);
      }

      throw err;
    }
  });
}

export async function updateVenueDetailsHours(
  vendorId,
  venueId,
  { opening_time, closing_time }
) {
  const venue = await repository.updateVenueDetailsTime(
    vendorId,
    venueId,
    opening_time,
    closing_time
  );

  if (!venue) {
    throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
  }

  return venue;
}
