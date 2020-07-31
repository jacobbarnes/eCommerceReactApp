#!/usr/bin/env python3

# initialize django
import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'arcticapi.settings'
import json
import django
django.setup()

# regular imports
from api.models import Category, Product

# main script
def main():
    Product.objects.all().delete() #first, clear all products

    categories = {}
    

    with open('products.json') as json_file:
        data = json.load(json_file)

    products = data['products']
    
    for prod in products:
        if (Category.objects.filter(title=prod['category']).exists() == False):
            cat = Category()
            cat.title = prod['category']
            cat.save()

        dbprod = Product()
        dbprod.id = prod['id']
        dbprod.name = prod['name']
        dbprod.category = Category.objects.get(title=prod['category'])
        dbprod.filename = prod['filename']
        dbprod.description = prod['description']
        dbprod.price = prod['price']

        dbprod.save()


# bootstrap
if __name__ == '__main__':
    main()
