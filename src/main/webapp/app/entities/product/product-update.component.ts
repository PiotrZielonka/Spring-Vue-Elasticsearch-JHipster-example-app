import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { required, minLength, maxLength, decimal, minValue, maxValue } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import { IProduct, Product } from '@/shared/model/product.model';
import ProductService from './product.service';
import { ProductCategoryEnum } from '@/shared/model/enumerations/product-category-enum.model';

const validations: any = {
  product: {
    productCategoryEnum: {
      required,
    },
    name: {
      required,
      minLength: minLength(0),
      maxLength: maxLength(5000),
    },
    quantity: {},
    priceNet: {
      required,
      decimal,
      min: minValue(0),
      max: maxValue(1000000),
    },
    vat: {
      required,
      decimal,
      min: minValue(5),
      max: maxValue(100),
    },
    priceGross: {},
    stock: {
      required,
      decimal,
      min: minValue(0),
      max: maxValue(1000000),
    },
    description: {
      required,
      minLength: minLength(0),
      maxLength: maxLength(10000),
    },
    createTime: {},
    updateTime: {},
    image: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ProductUpdate extends mixins(JhiDataUtils) {
  @Inject('productService') private productService: () => ProductService;
  @Inject('alertService') private alertService: () => AlertService;

  public product: IProduct = new Product();
  public productCategoryEnumValues: string[] = Object.keys(ProductCategoryEnum);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productId) {
        vm.retrieveProduct(to.params.productId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.product.id) {
      this.productService()
        .update(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('exampleVueApp.product.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.productService()
        .create(this.product)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('exampleVueApp.product.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.product[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.product[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.product[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.product[field] = null;
    }
  }

  public retrieveProduct(productId): void {
    this.productService()
      .find(productId)
      .then(res => {
        res.createTime = new Date(res.createTime);
        res.updateTime = new Date(res.updateTime);
        this.product = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.product && field && fieldContentType) {
      if (Object.prototype.hasOwnProperty.call(this.product, field)) {
        this.product[field] = null;
      }
      if (Object.prototype.hasOwnProperty.call(this.product, fieldContentType)) {
        this.product[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {}
}
