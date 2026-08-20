import path from 'path';

import { pool } from '../../../../infrastructure/database/db.js';
import { deleteFromR2, uploadToR2 } from '../../../../utils/r2.storage.js';
import { withTransaction } from '../../../../utils/transaction.js';
import { insertIntoVenueApplications } from './repository.js';

export async function processSubmission(vendorId, data, files) {
  const proofDocument = files.proof_document[0];
  const proofDocumentKey = `venue-application/${vendorId}/${Date.now()}-venueProof${path.extname(proofDocument.originalname)}`;
  const venueImagesKey = files.venue_images.map((image, index) => {
    return `venue-application/${vendorId}/${Date.now()}-${index}-venueImages${path.extname(image.originalname)}`;
  });
  const uploadedKeys = [];

  try {
    await uploadToR2(
      proofDocument.buffer,
      proofDocumentKey,
      proofDocument.mimetype
    );
    uploadedKeys.push(proofDocumentKey);

    for (const [index, image] of files.venue_images.entries()) {
      await uploadToR2(image.buffer, venueImagesKey[index], image.mimetype);

      uploadedKeys.push(venueImagesKey[index]);
    }

    return await withTransaction(pool, async (client) => {
      return await insertIntoVenueApplications(client, {
        vendor_id: vendorId,
        ...data,
        images: venueImagesKey,
        proof_document_key: proofDocumentKey,
      });
    });
  } catch (err) {
    for (const key of uploadedKeys) {
      await deleteFromR2(key);
    }

    throw err;
  }
}
