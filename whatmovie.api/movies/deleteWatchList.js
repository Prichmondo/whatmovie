const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const Exception = require('./domain/exception');
const createConnection = require('./database/createConnection');

module.exports = (event, context, callback) => {

  try {

    if(!utils.hasValue(event.body)) {
      throw new Exception("Request body is empty");
    }
    
    const body = JSON.parse(event.body);    
    const movieId = body.movieId;
    const userId = utils.getUserId(event);
    
    if(!utils.hasValue(movieId)) {
      throw new Exception("Movie ID is empty");
    }
    
    if(!utils.hasValue(userId)) {
      throw new Exception("User not authorizer");
    }
    
    createConnection()
      .then(function (connection) {

        connection.query('DELETE FROM wishlist WHERE user_id = ? AND movie_id = ?', [userId, movieId],
          function (error, results) {
            if (error) {
              connection.destroy();
              callback(null, new ApiResponse(500, JSON.stringify(error)));
            } else {                    
              connection.end(function (err) {
                if(err) {
                  callback(null, 
                    new ApiResponse(500, JSON.stringify(err))
                  );
                } else {
                  callback(null, 
                    new ApiResponse(200, JSON.stringify(results))
                  );
                }
              });
            }
        });
        
      })
      .catch(function (error){
        callback(null, 
          new ApiResponse(200, JSON.stringify(error))
        );
      });
  } catch (error) {
    callback(null,
      new ApiResponse(500, JSON.stringify(error))
    );
  }

};