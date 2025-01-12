const colors = require('colors');

const logRequest = (req, res, next) => {
    const startTime = Date.now(); // Capture the start time

    // Log the request details with colors and formatting
    console.log(
        `[${new Date().toISOString().green}] ` + // Timestamp in green
        `${req.method.bold.blue} request to ${req.url.bold.cyan}`
    );

    // Listen for the response finish event to log response status and time taken
    res.on('finish', () => {
        const duration = Date.now() - startTime; // Calculate duration
        console.log(
            `[${new Date().toISOString().green}] ` + // Timestamp in green
            `Response status: ${res.statusCode.toString().bold.red}, ` + // Status code in red
            `Time taken: ${duration.toString().bold.yellow}ms` // Duration in yellow
        );
    });

    next(); // Proceed to the next middleware
}

module.exports = logRequest;
