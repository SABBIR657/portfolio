const asyncHandler = (fn, options = {}) => {
  return async (req, res, next) => {
    // Optional transaction support
    const session = options.transaction ? await mongoose.startSession() : null;
    if (session) session.startTransaction();
    
    try {
      // Execute handler
      const result = await fn(req, res, next, session);
      
      // Commit transaction if exists
      if (session) {
        await session.commitTransaction();
        session.endSession();
      }
      
      return result;
    } catch (err) {
      // Abort transaction if exists
      if (session) {
        await session.abortTransaction();
        session.endSession();
      }
      
      // Enhanced error processing
      if (!err.processed) {
        err = processError(err, req);
      }
      
      // Skip handling if headers sent or error handled
      if (res.headersSent || err.handled) return;
      
      // Send error response
      res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error',
        ...(err.details && { details: err.details }),
        ...(err.code && { code: err.code })
      });
    }
  };
};

// Helper function to process different error types
function processError(err, req) {
  console.error(`[${new Date().toISOString()}] Error in ${req.method} ${req.path}:`, err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return {
      processed: true,
      statusCode: 400,
      message: 'Validation failed',
      details: Object.values(err.errors).map(e => e.message)
    };
  }
  
  // MongoDB duplicate key
  if (err.code === 11000) {
    return {
      processed: true,
      statusCode: 409,
      message: 'Duplicate key violation',
      details: err.keyValue
    };
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return {
      processed: true,
      statusCode: 401,
      message: 'Invalid token'
    };
  }
  
  return err;
}

module.exports = asyncHandler;