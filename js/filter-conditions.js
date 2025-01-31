"use strict";

class PageFilterConditions extends PageFilter {
	constructor () {
		super();

		this._sourceFilter = new SourceFilter();
		this._groupFilter = new Filter({header: "Group"})
	}

	mutateForFilters (it) {
		if (it.group) it._fGroup = it.group || "";
		it._fSources = SourceFilter.getCompleteFilterSources(it);
	}

	addToFilters (it, isExcluded) {
		if (isExcluded) return;

		if (it._fGroup != null) this._groupFilter.addItem(it._fGroup);
		this._sourceFilter.addItem(it._fSources);
	}

	async _pPopulateBoxOptions (opts) {
		opts.filters = [
			this._sourceFilter,
			this._groupFilter,
		];
	}

	toDisplay (values, it) {
		return this._filterBox.toDisplay(
			values,
			it._fSources,
			it._fGroup,
		)
	}
}
