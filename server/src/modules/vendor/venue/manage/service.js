import ERROR_CONFIG from './error.config.js';
import { fetchReverificationApplication, fetchVenue } from './repository.js';

export async function getVenueDetails(venueId, vendorId) {
  const venue = await fetchVenue(venueId, vendorId);

  if (!venue) {
    throw new ApiError(ERROR_CONFIG.VENUE_NOT_FOUND);
  }

  const reverification = await fetchReverificationApplication(venueId);

  return { venue, reverification };
}
