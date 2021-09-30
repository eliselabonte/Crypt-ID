const router = require('express').Router();
const { Category, Post } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include the associated Post data
    try{
        const categories = await Category.findAll({
        include: [{model: Post}]
        })
        res.json(categories)
    }
    catch{ err => {
        res.status(500).json(err)
        }
    }
});

router.get('/:id', async (req, res) => {
  // find a single category by its `id`
    try {
        const category = await Category.findByPk(req.params.id, {
        include:  [{model: Post}]
        })
        res.json(category)
    }
    catch{
        res.status(404).json(err)
    }
});

router.post('/', async (req, res) => {
  // create a new category
    try {
        const newCategory = await Category.create(req.body)
        res.status(200).json(newCategory)
    }
    catch (err) {res.status(500).json(err)}
});

router.put('/:id', (req, res) => {
  // update a category's name by its `id` value
    Category.update({
        where: { id: req.params.id }, 
    })
        .catch((err) => res.status(500).json(err))
});

router.delete('/:id', async (req, res) => {
  // delete on category by its `id` value
    try {
        const category = await Category.destroy({
        where: {id: req.params.id}
        })

        if (!category) {
        res.status(404).json({ message: 'no category found with that id.'})
        }
    }
    catch {
        res.status(500).json(err);
    }
});

module.exports = router;
