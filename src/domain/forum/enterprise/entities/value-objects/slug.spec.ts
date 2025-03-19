import { Slug } from './slug'

test('Should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('This ís a slug example!')

  expect(slug.value).toEqual('this-is-a-slug-example')
})
