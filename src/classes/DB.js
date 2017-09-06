import { Comic } from "./Comic";

const KEY = "CC";

export class DB {
  records = [];
  recordsComics = [];

  constructor() {
    this.getComics();
  }

  getComics() {
    let data = localStorage.getItem(KEY);
    if (data) {
      this.records = JSON.parse(data);
      this.recordsComics = this.records.map(c => new Comic(c));
      return this.recordsComics;
    } else {
      return [];
    }
  }

  save() {
    localStorage.setItem(KEY, JSON.stringify(this.records));
    return true;
  }

  addRecord(comic) {
    comic = new Comic(comic);
    if (this.records.filter(r => r.id === comic.id).length === 0) {
      console.log("Adding > ", comic);
      this.records.push(comic.storable);
      this.recordsComics.push(comic);
      return this.save();
    } else {
      return false;
    }
  }
}
