import crypto from 'crypto';
import userAgent from 'user-agent';
import ShortenerModel from '../model/ShortenerModel.js';

class ShortenerController {
  async index(req, res) {
    const shoreners = await ShortenerModel.find().lean();
    res.json({ shoreners });
  }
  async store(req, res) {
    const { link, name, expiredDate } = req.body;
    const [hash] = crypto.randomUUID().split('-');

    const shortener = await ShortenerModel.create({
      hash,
      link,
      name,
      expiredDate,
    });

    res.json({ shortener });
  }
  async update(req, res) {
    const { id } = req.params;

    try {
      const shortener = await ShortenerModel.findById(id);

      if (shortener) {
        await shortener.remove();
        res.json({ message: 'Shortener removed!' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Unexpected error.' });
    }
  }
  async remove(req, res) {
    const { id } = req.params;

    try {
      const shortener = await ShortenerModel.findById(id);

      if (shortener) {
        await shortener.remove();
        res.json({ message: 'Shortener removed!' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Unexpected error.' });
    }
  }
  async getOne(req, res) {
    const { id } = req.params;

    try {
      const shortener = await ShortenerModel.findById(id);
      if (shortener) {
        return res.json({ shortener });
      }
      return res.status(404).json({ message: 'Shortener not found.' });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: 'Unexpected error.' });
    }
  }

  async redirect(req, res) {
    const { hash } = req.params;
    const userAgentDetailed = userAgent.parse(req.headers['user-agent']);

    const metadata = {
      ip: req.ip,
      language: req.headers['accept-language'],
      userAgent: req.headers['user-agent'],
      userAgentDetailed,
    };

    const shortener = await ShortenerModel.findOne({ hash });

    if (shortener) {
      if (shortener.expired) {
        return res.json({ message: 'Link expired!' });
      }

      shortener.hits++;
      shortener.metadata.push(metadata);

      await shortener.save();

      return res.redirect(shortener.link);
    }

    res.json({ message: 'Shortener not found!' });
  }
}

export default ShortenerController;
