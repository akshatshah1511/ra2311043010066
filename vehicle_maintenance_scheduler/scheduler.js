const log = require("../logging_middleware/logger");
const { getDepots, getVehicles } = require("./api");

const knapsack = (tasks, maxHours) => {
    let n = tasks.length;
    let dp = Array(n + 1).fill().map(() => Array(maxHours + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        let { duration, impact } = tasks[i - 1];

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

    return dp[n][maxHours];
};

const runScheduler = async () => {
    try {
        await log("backend", "info", "cron_job", "Fetching depots");

        const depots = await getDepots();
        const vehicles = await getVehicles();

        await log("backend", "info", "cron_job", "Data fetched");

        depots.depots.forEach((depot) => {
            const maxHours = depot.mechanicHours;

            const tasks = vehicles.vehicles.map(v => ({
                duration: v.duration,
                impact: v.impact
            }));

            const result = knapsack(tasks, maxHours);

            console.log(`Depot ${depot.id} → Max Impact:`, result);
        });

        await log("backend", "info", "domain", "Scheduler completed");

    } catch (err) {
        await log("backend", "error", "domain", "Scheduler failed");
    }
};

runScheduler();
