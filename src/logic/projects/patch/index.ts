import { client } from "./../../../database/db";
import { QueryConfig } from "pg";
import format from "pg-format";
import { Request, Response } from "express";

export const updateProject = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = format(
        `
        UPDATE 
            projects
        SET
            (%I) = ROW(%L)
        WHERE 
            project_id = $1
        RETURNING *;
    `,
        Object.keys(req.body),
        Object.values(req.body)
    );

    const QueryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };

    const QueryResult = await client.query(QueryConfig);

    return res.json(QueryResult.rows[0]);
};
