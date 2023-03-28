import { client } from "./../../database/db";
import { QueryConfig } from "pg";
import { Request, Response, NextFunction } from "express";
import { requiredKeysProject } from "../../interface/types";

export const verifyIdProject = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id: number = +req.params.id;

    const queryString = `
    SELECT  
        *
    FROM
        projects
    WHERE
        project_id = $1;
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

export const verifyRequiredKeysProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const kyes: Array<string> = Object.keys(req.body);
    const requiredKeys: Array<string> = [
        "description",
        "developerId",
        "endDate",
        "estimatedTime",
        "name",
        "repository",
        "startDate",
    ];
    const allRequired: boolean = kyes.every((key: string) => {
        return requiredKeys.includes(key);
    });

    if (!allRequired) {
        return res.status(400).json({
            message: `Required/valid keys are: ${requiredKeys}`,
        });
    }

    return next();
};
