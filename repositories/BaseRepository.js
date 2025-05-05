class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(query = {}, options = {}) {
    const { sort = { createdAt: -1 }, limit = 100, skip = 0 } = options;
    return this.model.find(query).sort(sort).limit(limit).skip(skip);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async findOne(query) {
    return this.model.findOne(query);
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseRepository;
