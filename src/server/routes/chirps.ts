import { Router } from 'express';
import chirpstore from '../utils/chirpstore';

const router = Router();
router.get('/:id', (req, res) => {
  const id = req.params.id;
  let chirp = chirpstore.GetChirp(id);
  res.json(chirp);
});

router.get('/', (req, res) => {
  let chirps = chirpstore.GetChirps();
  let chirpsData = Object.keys(chirps).map(chirp => {
    return {
      id: chirp,
      username: chirps[chirp].username,
      message: chirps[chirp].message
    }
  });
  chirpsData.pop();
  res.json(chirpsData);
});

router.post('/', (req, res) => {
  chirpstore.CreateChirp(req.body);
  res.json('IT WORKED!');
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  chirpstore.UpdateChirp(id, req.body);
  res.json('Edited!');
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  chirpstore.DeleteChirp(id);
  res.json('deleted!');
});

export default router;
