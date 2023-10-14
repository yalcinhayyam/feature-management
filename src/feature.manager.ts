export interface IFeature<T> {
  keyword: string;
  value?: T;
}

export interface IFeatureManager {
  isEnable(keyword: string): boolean | undefined;
  enable(keyword: string): void;
  disable(keyword: string): void;
}

export class FeatureManager implements IFeatureManager {
  constructor(private readonly features: IFeature<any>[] = []) {}

  enable(keyword: string) {
    this._remove(keyword);
  }

  disable(keyword: string) {
    this._add(keyword);
  }

  isEnable(keyword: string): boolean | undefined {
    return this.features.find((item) => item.keyword === keyword)?.value;
  }

  private _add<T>(keyword: string, value?: T) {
    this.features.push({ keyword, value: value });
  }
  private _remove(keyword: string) {
    var index = this._getIndex(keyword);
    this.features.splice(index, 1);
  }
  private _addOrUpdate(keyword: string, value: boolean) {
    var index = this._getIndex(keyword);

    if (index > 0) {
      return this.features.splice(index, 1, { keyword, value });
    }
    this.features.push({ keyword, value: true });
  }
  private _getIndex(keyword: string) {
    return this.features.findIndex((item) => item.keyword === keyword);
  }
}
