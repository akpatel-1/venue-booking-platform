import ApiError from '../../../../utils/api.error.js';
import { uploadToCloudinary } from '../../../../utils/cloudinary.storage.js';
import ERROR_CONFIG from './error.config.js';
import {
  fetchReverificationApplication,
  fetchVenue,
  updatedCoverImage,
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
    const coverImageId = await uploadToCloudinary(
      file.buffer,
      `venues/${vendorId}/cover`
    );
    await updatedCoverImage({ vendorId, venueId, coverImageId });
  } catch (err) {
    throw new ApiError(ERROR_CONFIG.FILE_UPLOAD_FAILED);
  }
}
