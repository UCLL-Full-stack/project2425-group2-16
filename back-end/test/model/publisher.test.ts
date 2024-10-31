import { Publisher } from '../../model/publisher';
import { DomainError } from '../../errors/DomainError';

const validPublisherData = {
    contactInformation: 'contact@example.com',
    overallRating: 4.5,
    dateOfFirstPublishing: new Date('2010-05-20'),
    name: 'Example Publisher',
    country: 'Countryland',
    website: 'https://examplepublisher.com'
};

test('Given valid data, when creating a Publisher, then it should create successfully', () => {
    const publisher = new Publisher(validPublisherData);
    expect(publisher.getContactInformation()).toBe(validPublisherData.contactInformation);
    expect(publisher.getOverallRating()).toBe(validPublisherData.overallRating);
    expect(publisher.getDateOfFirstPublishing()).toEqual(validPublisherData.dateOfFirstPublishing);
    expect(publisher.getName()).toBe(validPublisherData.name);
    expect(publisher.getCountry()).toBe(validPublisherData.country);
    expect(publisher.getWebsite()).toBe(validPublisherData.website);
});

test('Given an overall rating greater than 5, when creating a Publisher, then it should throw DomainError', () => {
    expect(() => {
        new Publisher({ ...validPublisherData, overallRating: 6 });
    }).toThrow(DomainError);
});

test('Given an overall rating less than 0, when creating a Publisher, then it should throw DomainError', () => {
    expect(() => {
        new Publisher({ ...validPublisherData, overallRating: -1 });
    }).toThrow(DomainError);
});

test('Given a future date for dateOfFirstPublishing, when creating a Publisher, then it should throw DomainError', () => {
    expect(() => {
        new Publisher({ ...validPublisherData, dateOfFirstPublishing: new Date('2100-01-01') });
    }).toThrow(DomainError);
});

test('Given an empty name, when creating a Publisher, then it should throw DomainError', () => {
    expect(() => {
        new Publisher({ ...validPublisherData, name: '' });
    }).toThrow(DomainError);
});

test('Given a country name longer than 50 characters, when creating a Publisher, then it should throw DomainError', () => {
    expect(() => {
        new Publisher({ ...validPublisherData, country: 'A'.repeat(51) });
    }).toThrow(DomainError);
});

test('Given a website URL longer than 100 characters, when creating a Publisher, then it should throw DomainError', () => {
    expect(() => {
        new Publisher({ ...validPublisherData, website: 'https://' + 'a'.repeat(95) });
    }).toThrow(DomainError);
});
