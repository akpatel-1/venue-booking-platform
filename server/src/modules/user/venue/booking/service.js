import { getFromCloudinary } from '../../../../utils/cloudinary.storage.js';
import * as repository from '../booking/repository.js';

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
