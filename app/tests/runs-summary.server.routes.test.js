// calculate summaries and save to db - with user id

/**
 * Must be able to retrieve
 *
 * Perfect scenario
 * Mongodb notifies us there is a new runsdata - emit? - can we watch for
 * We retrieve the data from Mongodb
 * We calculate the summary
 * We save the summary.
 *
 * We could emit a message when the data is uploaded - in the return value we include the run id
 * middleware?
 * MIDDLEWARE seems like the best option. It means there is a one time hit but then the data is stored.
 *
 */

// Notification via route - middleware - test that it is the correct data - from mongodb that is returned
// Calculate - dependency on geolib - distance - avg speed per km
// save into db. - need a new schema and model - KISS - look at elevation after
//
// Start with the model
//
//
