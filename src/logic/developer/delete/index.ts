import { client } from "../../../database/db";
import { QueryConfig } from "pg";
import { Request, Response } from "express";

export const deleteDeveloper = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const id: number = +req.params.id;

    const queryString: string = `
    DELETE FROM
        developers
    WHERE
        id = $1
    `;
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id],
    };
    await client.query(queryConfig);

    return res.send();
};
