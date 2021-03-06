const actor = require('./actor.js')

test('actor can not read parcel destination before being added as reader', async () => {
  expect.assertions(1)

  const zalando = await actor.create('Zalando')
  const postnord = await actor.create('Postnord')
  const parcel = await zalando.createParcel()

  await expect(postnord.receiveParcel(parcel.id))
    .rejects.toMatchObject(new Error('no key found'))
})

test('actor can receive parcel after being added as reader', async () => {
  expect.assertions(1)

  const zalando = await actor.create('Zalando')
  const postnord = await actor.create('Postnord')
  const parcel = await zalando.createParcel()

  await zalando.addDestinationReader(parcel.id, postnord)

  await expect(postnord.receiveParcel(parcel.id))
    .resolves.toBeDefined()
})
