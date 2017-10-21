import {
  DATE_FORMAT_COMPARE
} from "../constants/cons";
import moment from "moment";
import _ from "lodash";

/**
 * Returns an string to identify a unique Comic
 * @param {Comic} rr 
 */
export function GenerateComicId(rr) {
  let str = (rr.title + rr.volumen + (rr.variant || "")).toString();
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

/**
 * Returns am array with information for each of the Form's fields
 */
export function ComicFields() {
  return [
    new ComicField("Title", "text", "Avengers"),
    new ComicField("Volumen", "number", "11"),
    new ComicField("Variant", "text", undefined, false),
    new ComicField("Price", "number", "26"),
    new ComicField("Date", "date"),
    new ComicField("Owned", "checkbox", false, false)
  ];
}

/**
 * Provides an object to provide properties to a form field
 */
export class ComicField {
  title = "";
  id = "";
  type = "";
  // volumen = "";
  required = true;
  constructor(title, type, value, required) {
    this.title = title;
    this.id = this.title.toLowerCase();
    this.type = type;

    if (typeof value !== "undefined") {
      this.value = value;
    }

    if (typeof required !== "undefined" && required !== true) {
      this.required = false;
    }
  }
}

/**
 * Provides an object to handle a Comic record
 */
export class Comic {
  constructor(o) {
    if (!_.isUndefined(o) && !(o instanceof Comic)) {
      this.title = o._title || o.title;
      this.volumen = o._volumen || o.volumen;
      this.variant = o._variant || o.variant;
      this.price = o._price || o.price;
      this.date = o._date || o.date;
      this.owned = o._owned || o.owned || false;
      this.ownedDate = o.ownedDate;

      if (_.get(this, "owned", false) && !_.isUndefined(o._ownedDate)) {
        this.ownedDate = o._ownedDate;
      }
    } else if (o instanceof Comic) {
      // console.log("It's instance of Comic!!");
      return o;
    }
  }

  get id() {
    return GenerateComicId(this);
  }

  _title;
  get title() {
    return this._title;
  }
  set title(d) {
    if (d)
      this._title = d.toString();
  }

  _volumen;
  get volumen() {
    return this._volumen;
  }
  set volumen(d) {
    if (!isNaN(d)) {
      this._volumen = _.toNumber(d);
    }
  }

  _variant;
  get variant() {
    return this._variant || null;
  }
  set variant(d) {
    if (d)
      this._variant = d.toString();
  }

  _price;
  get price() {
    return this._price;
  }
  set price(d) {
    if (!isNaN(d)) {
      this._price = _.toNumber(d);
    }
  }

  _date = moment();
  get date() {
    return moment(this._date);
  }
  set date(d) {
    let date = moment(d);
    if (date) {
      this._date = date;
    }
  }
  get dateStr() {
    return this._date.format(DATE_FORMAT_COMPARE);
  }

  _owned = false;
  get owned() {
    return this._owned;
  }
  set owned(d) {
    this._owned = typeof d !== "undefined" && (d === true || d === 1);
    this.ownedDate = this.owned ? moment() : undefined;
  }
  get ownedStr() {
    return this._owned ? "Yes" : "No";
  }

  _ownedDate;
  set ownedDate(d) {
    this._ownedDate = d && !_.isNull(d) ? moment(d) : null;
  }
  get ownedDate() {
    return this._ownedDate ? moment(this._ownedDate) : null;
  }
  get ownedDateStr() {
    return !_.isNull(this.ownedDate) ? this.ownedDate.format(DATE_FORMAT_COMPARE) : null;
  }

  toggleOwned() {
    this.owned = !this.owned;
  }

  get storable() {
    return {
      id: this.id,
      title: this.title,
      volumen: this.volumen,
      variant: this.variant,
      price: this.price,
      date: this.dateStr,
      owned: this.owned,
      ownedDate: this.ownedDateStr
    };
  }
}