import ApiError from '../../../../utils/api.error.js';
import { uploadToCloudinary } from '../../../../utils/cloudinary.storage.js';
import ERROR_CONFIG from './error.config.js';
import {
  fetchReverificationApplication,
  fetchVenue,
  getCoverImage,
} from './repository.js';

export async function getVenueDetails(venueId, vendorId) {
  const venue = await fetchVenue(venueId, vendorId);

  if (!venue) {
    throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
  }

  const reverification = await fetchReverificationApplication(venueId);

  return { venue, reverification };
}

export async function uploadCoverImage(vendorId, venueId, file) {
  try {
    const venue = await getCoverImage(vendorId, venueId);

    if (!venue) {
      throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
    }

    const coverImageId = `venues/${vendorId}/${venueId}/cover_image`;
    await uploadToCloudinary(file.buffer, coverImageId);

    if (!venue.has_cover_image) {
      return await updateCoverImage(vendorId, venueId);
    }
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError(ERROR_CONFIG.FILE_UPLOAD_FAILED);
  }
}
