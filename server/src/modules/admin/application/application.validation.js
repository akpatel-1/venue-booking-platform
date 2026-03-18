import { ApiError } from '../../../utils/api.error.util.js';
import { ADMIN_ERROR_CONFIG } from '../application/application.error.config.js';
import { APPLICATION_STATUS } from './application.config.js';

const ALLOWED_STATUS = new Set(Object.values(APPLICATION_STATUS));
export function validateApplicationRequest(req, res, next) {
  let { status } = req.query;

  if (!status) {
    throw new ApiError(ADMIN_ERROR_CONFIG.EMPTY_STATUS);
  }

  if (Array.isArray(status)) {
    throw new ApiError(ADMIN_ERROR_CONFIG.MULTIPLE_STATUS_VALUES);
  }

  status = status.toLowerCase().trim();

  if (!ALLOWED_STATUS.has(status)) {
    throw new ApiError(ADMIN_ERROR_CONFIG.INVALID_STATUS);
  }

  req.Status = status;
  next();
}
