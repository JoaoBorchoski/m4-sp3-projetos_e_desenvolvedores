import { QueryConfig } from "pg";
import { Request, Response, NextFunction } from "express";
import { client } from "../database/db";
import {
    developerResult,
    iDeveloper,
    iDeveloperInfo,
    preferredSistem,
    validTechs,
} from "../interface/types";

export const verifyId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = +req.params.id;

    const queryString = `
    SELECT  
        *
    FROM
        developers
    WHERE
        id = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult = await client.query(QueryConfig);

    if (!queryResult.rowCount) {
        return res.status(404).json({
            message: "Id not found",
        });
    }
    return next();
};

export const verifyRequiredKeys = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const kyes: Array<string> = Object.keys(req.body);
    const requiredKeys: Array<string> = ["name", "email", "developerInfoId"];
    const allRequired: boolean = kyes.every((key: string) => {
        return requiredKeys.includes(key);
    });

    if (kyes.length < 2) {
        return res.status(400).json({
            message: `Required keys are: ${requiredKeys}`,
        });
    }

    if (!allRequired) {
        return res.status(400).json({
            message: `Required keys are: ${requiredKeys}`,
        });
    }

    return next();
};

export const verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const developer: iDeveloper = req.body;

    const queryString = `
    SELECT  
        *
    FROM
        developers
    WHERE
        email = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [developer.email],
    };

    const queryResult: developerResult = await client.query(QueryConfig);

    if (queryResult.rowCount > 0) {
        return res.status(409).json({
            message: "Email already exists",
        });
    }
    return next();
};

export const verifyInfos = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const developer: iDeveloperInfo = req.body;
    const preferredOs = developer.preferredOS;
    const OS: Array<preferredSistem> = ["Linux", "MacOs", "Windows"];

    if (preferredOs) {
        if (
            preferredOs == "Linux" ||
            preferredOs == "MacOs" ||
            preferredOs == "Windows"
        ) {
            return next();
        }

        return res.status(400).json({
            message: `Possibles operational systems are: ${OS}`,
        });
    }

    return next();
};

export const verifyRequiredKeysPatchDeveloper = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const kyes: Array<string> = Object.keys(req.body);
    const requiredKeys: Array<string> = ["name", "email"];
    const allRequired: boolean = kyes.every((key: string) => {
        return requiredKeys.includes(key);
    });

    if (!allRequired) {
        return res.status(400).json({
            message: `Valid keys are: ${requiredKeys}`,
        });
    }

    return next();
};

export const verifyRequiredKeysPatchInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const kyes: Array<string> = Object.keys(req.body);
    const requiredKeys: Array<string> = ["developerSince", "preferredOS"];

    const allRequired: boolean = kyes.every((key: string) => {
        return requiredKeys.includes(key);
    });

    if (!allRequired) {
        return res.status(400).json({
            message: `Valid keys are: ${requiredKeys}`,
        });
    }

    return next();
};

export const verifyIdInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = +req.params.id;

    const queryString = `
    SELECT * FROM developers d 
    JOIN developer_infos di 
    ON d.id = di.id_info
    WHERE di.id_info = $1;
    `;

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const queryResult = await client.query(QueryConfig);

    if (queryResult.rowCount) {
        return res.status(404).json({
            message:
                "Developer info alredy exists for this ID, update is possible",
        });
    }
    return next();
};

export const verifyTechs = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const tech: string = req.params.name;
    const validTechs: Array<string> = [
        "CSS",
        "Express.js",
        "HTML",
        "JavaScript",
        "MongoDB",
        "PostgreSQL",
        "Python",
        "React",
    ];

    const isValid: boolean = validTechs.includes(tech);

    if (!isValid) {
        return res.status(404).json({
            message: `Valid tech names are: ${validTechs}`,
        });
    }

    return next();
};

export const verifyTechsAdd = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const tech: string = req.body.name;
    const validTechs: Array<string> = [
        "CSS",
        "Express.js",
        "HTML",
        "JavaScript",
        "MongoDB",
        "PostgreSQL",
        "Python",
        "React",
    ];

    const isValid: boolean = validTechs.includes(tech);

    if (!isValid) {
        return res.status(404).json({
            message: `Valid tech names are: ${validTechs}`,
        });
    }

    return next();
};
