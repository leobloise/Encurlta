import UrlRepository from "../config/UrlRepository";
import prepare, {destroy} from "./prepareDbTest";

beforeAll(() => prepare());

/**
 * 
 * @param {UrlRepository} urlRepo 
 */
async function createOne(urlRepo) {

    await urlRepo.createUrl(
        {urlCode: 'aaa', longUrl: 'aaa', shortUrl: 'aaa', clickCount: 0, dateCreation: 1212313}
    )
    
    const urlCreated = await urlRepo.getOne(['urlCode'], 'urlCode', 'aaa')

    return urlCreated;
}
/**
 * 
 * @param {UrlRepository} urlRepo 
 */
async function updateOne(urlRepo) {

    const oldOne = await urlRepo.getOne(['shortUrl'], 'urlCode', '36Ccx4wHL')

    await urlRepo.update('shortUrl', 'leonardo', '36Ccx4wHL')

    const newOne = await urlRepo.getOne(['shortUrl'], 'urlCode', '36Ccx4wHL');

    return [oldOne, newOne]

}

test('GetOneTest', async () => {
    const urlRepo = new UrlRepository('urlsTest');

    return urlRepo.getOne(['urlCode'], "urlCode", '36Ccx4wHL')
    .then(row => expect(row).toEqual({urlCode: '36Ccx4wHL'}))
})

test('CreateOne', async () => {

    const urlRepo = new UrlRepository('urlsTest');

    return createOne(urlRepo)
    .then(created => {
        expect(created).toEqual({urlCode: "aaa"})
    })

})

test('UpdateOne', async () => {
    const urlRepo = new UrlRepository('urlsTest');

    return updateOne(urlRepo)
    .then(([oldOne, newOne]) => {

        expect(oldOne.shortUrl).not.toBe('leonardo')
        expect(newOne.shortUrl).toBe('leonardo')

    })
})

test('GetAll', async() => {
    const urlRepo = new UrlRepository("urlsTest")

    return urlRepo.getAll(['shortUrl'])
    .then(rows => {
        expect(rows.length).toBe(9);
    })

})

test('GetAllWithCondition', async() => {
    const urlRepo = new UrlRepository("urlsTest")

    return urlRepo.getAll(['shortUrl'], ["WHERE shortUrl = 'leonardo'"])
    .then(rows => {
        expect(rows.length).toBe(1);
    })
})

afterAll(() => destroy())