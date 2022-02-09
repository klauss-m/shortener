import ShortenerModel from '../model/ShortenerModel.js';

class ShortenerController {
  async index(req, res) {
    const shoreners = await ShortenerModel.find().lean();
    res.json({ shoreners });
  }
  async store(req, res) {
    const body = request.body;
    const shortner = await ShortnerModel.create(body);

    res.json({ shortner });
  }
  update(request, response) {}
  remove(request, response) {}
  getOne(request, response) {}
}

export default ShortenerController;
