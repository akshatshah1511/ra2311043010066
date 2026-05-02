const log = require("../logging_middleware/logger");

const schedule = async () => {
    const vehicles = [
        { duration: 2, impact: 5 },
        { duration: 3, impact: 8 },
        { duration: 1, impact: 4 }
    ];

    const maxHours = 5;

    let n = vehicles.length;
    let dp = Array(n + 1).fill().map(() => Array(maxHours + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        let { duration, impact } = vehicles[i - 1];

        for (let w = 0; w <= maxHours; w++) {
            if (duration <= w) {
                dp[i][w] = Math.max(
                    impact + dp[i - 1][w - duration],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    await log("backend", "info", "domain", "Scheduler executed");

    console.log("Max Impact:", dp[n][maxHours]);
};

schedule();
