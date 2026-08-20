import ApiError from '../../../../utils/api.error.js';
import ERROR_CONFIG from './error.config.js';

export default function validateFileCount(req, res, next) {
  const venueImages = req.files?.venue_images;
  const proofDocument = req.files?.proof_document;

  if (!venueImages || venueImages.length !== 5) {
    throw new ApiError(ERROR_CONFIG.VENUE_IMAGES_REQUIRED);
  }

  if (!proofDocument || proofDocument.length !== 1) {
    throw new ApiError(ERROR_CONFIG.PROOF_DOCUMENT_REQUIRED);
  }
  next();
}
