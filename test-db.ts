import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";

const resolveMongoUri = (): string => {
    if (process.env.MONGODB_URI && process.env.MONGODB_URI.trim()) {
        return process.env.MONGODB_URI.trim();
    }

    const envPath = path.resolve(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) {
        throw new Error("MONGODB_URI environment variable is not set and .env file was not found.");
    }

    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/^MONGODB_URI\s*=\s*(.+)$/m);
    if (!match) {
        throw new Error("MONGODB_URI could not be found in .env.");
    }

    let value = match[1].trim();
    if (
        (value.startsWith("\"") && value.endsWith("\"")) ||
        (value.startsWith("'") && value.endsWith("'"))
    ) {
        value = value.slice(1, -1);
    }

    return value;
};

const main = async () => {
    const uri = resolveMongoUri();

    try {
        const connection = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(
            `OK, MongoDB connection established. Host: ${connection.connection.host} DB name: ${connection.connection.name}`
        );
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exitCode = 1;
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
};

main().catch((error) => {
    console.error("Unexpected error while testing MongoDB connection:", error);
    process.exit(1);
});
