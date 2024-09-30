import { connect } from "../config/database.js";

export async function getAllLenovoNotebooks(req, res){
	const client = await connect();
  const response = await client.query('SELECT * FROM notebooks');
	res.status(200).json(response.rows);

	return response.data;
};
