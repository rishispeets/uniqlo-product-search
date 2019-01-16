# Uniqlo Product Search

> A serverless scraper for finding products on Uniqlo's website.

I needed a new winter jacket, but for some reason, the jacket I wanted kept dissapearing from Uniqlo's website. Since I value my time so much, I build this scraper.

The Lambda accepts a url and a string containing search terms. It performs a fuzzy search(-ish), and returns a sorted array with the product that have the highest to lowest search match.

You can pair the Lambda with something like AWS CloudWatch for regular scrapes, or AWS API Gateway if you need an endpoint.

Also, right after I started building this, I bought a different jacket.

## Install

```
npm install
```

## Usage

```
npm install -g serverless
sls deploy
```

## Contributing

PRs accepted but you don't really want to.

## License

MIT ©Rishi Speets
