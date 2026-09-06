import ApiError from '../../../../utils/api.error.js';
import { getFromCloudinary } from '../../../../utils/cloudinary.storage.js';
import * as repository from '../booking/repository.js';
import { ERROR_CONFIG } from './error.config.js';

export async function getVenues() {
  const data = await repository.getVenues();

  return Promise.all(
    data.map(async (venue) => {
      const { vendor_id, ...publicVenue } = venue;
      const coverImageId = [`venues/${vendor_id}/${venue.id}/cover_image`];
      return {
        ...publicVenue,
        cover_img_url: (await getFromCloudinary(coverImageId))[0],
      };
    })
  );
}

export async function getVenue(venueId) {
  const data = await repository.getVenue(venueId);
  const { vendor_id, images, ...venue } = data;

  const imagesUrl = await getFromCloudinary(images);

  return {
    ...venue,
    images: imagesUrl,
  };
}

export async function getVenuePricing(venueId) {
  const bookingType = await repository.getVenueBookingType(venueId);

  if (!bookingType) {
    throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
  }
  const pricing = await repository.getVenuePricing(venueId);

  if (!pricing.length) {
    throw new ApiError(ERROR_CONFIG.VENUE_PRICING_NOT_FOUND);
  }

  return { booking_type, pricing };
}
