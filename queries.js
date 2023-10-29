const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'db.tmgleffzsdipwrpjjsut.supabase.co',
  database: 'postgres',
  password: '4IQDAK7wVSrmsV4u',
  port: 5432,
});

const getCurriculos = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCurriculoBynome_completo = (request, response) => {
  const nome_completo = request.params.nome_completo;

  pool.query('SELECT * FROM curriculo WHERE nome_completo = $1', [nome_completo], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCurriculo = (request, response) => {
  const {
    nome_completo,
    endereco,
    email,
    telefone,
    formacao,
    experiencia,
  } = request.body;

  pool.query(
    'INSERT INTO curriculo (nome_completo, endereco, email, telefone, formacao, experiencia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
    [nome_completo, endereco, email, telefone, formacao, experiencia],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ id: results.rows[0].id });
    }
  );
};

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    nome_completo,
    endereco,
    email,
    telefone,
    formacao,
    experiencia,
  } = request.body;

  pool.query(
    'UPDATE curriculo SET nome_completo = $1, endereco = $2, email = $3, telefone = $4, formacao = $5, experiencia = $6 WHERE id = $7',
    [nome_completo, endereco, email, telefone, formacao, experiencia, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getCurriculos,
  getCurriculoBynome_completo,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
};
