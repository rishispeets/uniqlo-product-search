# Uniqlo Product Search

> A serverless scraper for finding products on Uniqlo's website.

<div style="text-align:center"><img src ="https://cdn.pbrd.co/images/HWLnSEo.jpg" /></div>
<div style="text-align:center">Photo by Daniel Bowman on Unsplash</div>
<br>

I needed a new winter jacket, but for some reason, the jacket I wanted kept dissapearing from Uniqlo's website. Since I value my time so much, I build this scraper.

The Lambda accepts a url and a string containing search terms. It performs a fuzzy search(-ish), and returns the products matching the search terms, from highest to lowest relevance.

You can pair the Lambda with something like AWS CloudWatch for regular scrapes, or AWS API Gateway if you need an endpoint.

Right after I started building this, I bought a different jacket. May that serve as a lesson to myself never to build silly things like this again.

## Install

```
npm install
```

## Usage

```
npm install -g serverless
sls deploy
```
## API

Example of a valid Lambda event argument:

```JSON
{
  "url": "https://www.uniqlo.com/eu/en/men/outerwear/coats-jackets/wool-coats",
  "searchTerms": "wool coat"
}
```

## Contributing

PRs accepted but you don't really want to.

## License

MIT ©Rishi Speets

## Disclaimer

This software is not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Uniqlo. All product and company names are the registered trademarks of their original owners. The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with Uniqlo. 
