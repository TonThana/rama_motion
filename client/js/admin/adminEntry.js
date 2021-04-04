
import Control from "../control";
import { DT_LOCALES } from "./locales";
import { renderResult, createNumericalSummary, parseNumResult } from "../result/result";

const DT_PREFIX = "jtable";
const DT_TRIGGER = `[data-replace='${DT_PREFIX}']`;
export const adminEntry = (initialData) => {
    console.log(initialData)
    document.querySelectorAll(DT_TRIGGER)
        .forEach(el => new DataTable(el, initialData).init());

    const homeButton = document.getElementById("admin-button-home")
    homeButton.addEventListener('click', (ev) => {
        ev.preventDefault();
        Control.show("regis")
    })
}

const ColName2ObjectKey = {
    "Name": "name",
    "Birthdate": "birthdate",
    "Test Date": "testdate",
    "Mode": "testtype",
    "Eye": "eyeside"
}

class DataTable {
    constructor(el, data) {
        this.el = el
        this.data = data
        this.currPage = 1;
        this.perPage = 10;
        this.locale = {}
        this.skipkey = ["__v", "_id", "servertimestamp", "rawgamedata", "numericalsummary"],
            this.includeKey = ["name", "birthdate", "testdate", "testtype", "eyeside"]


    }


    /**
     * Checks if elements has an ID assigned.
     * If not, generate one by current UNIX timestamp
     * This ensures good probability of unique ID
     */
    checkId() {
        if (!this.el.hasAttribute("id") || this.el.id.length == 0)
            this.el.id = `${DT_PREFIX}-${+(new Date())}`;
    }
    /**
    * Write a message that tells the rows' range currently shown
    */
    getPgMessage() {
        let start = (this.currPage - 1) * this.perPage + 1
        let tot = this.el.querySelectorAll("tbody tr.textdata").length - 1;
        let end = start + tot;

        document.querySelector(`#${this.el.id}_pgdisplay`).innerHTML =
            this.locale.SHOWING_TO
                .replace("{FROM}", start)
                .replace("{TO}", end)
                .replace("{SIZE}", this.data.length);
    }
    /**
    * Encapsulates table's data in an array of objects
    * @returns {object[]}
    */
    // getData() {
    //     let res = [],
    //         props = [];

    //     this.el.querySelectorAll("thead th").forEach(col =>
    //         props.push(col.innerHTML)
    //     );

    //     this.el.querySelectorAll("tbody > tr").forEach(row => {
    //         let item = {};
    //         row.querySelectorAll("td").forEach((col, i) =>
    //             item[props[i]] = col.innerHTML
    //         );
    //         res.push(item);
    //     });

    //     return res;
    // }

    /**
     * Arrange given data array into the table
     * @param {object[]} data - the given data array
     */
    printData = (data) => {

        let tbody = this.el.querySelector("tbody");
        tbody.innerHTML = "";

        data.forEach(o => {
            let row = document.createElement("tr");
            row.classList.add('textdata')
            Object.keys(o).forEach(k => {
                if (this.includeKey.includes(k)) {
                    let col = document.createElement("td");
                    col.innerHTML = o[k];
                    row.appendChild(col);
                }
            });

            // extra column for result view
            const key = o._id
            let resBtnCol = document.createElement("td")
            const viewBtn = document.createElement("button")

            viewBtn.setAttribute('id', `${key}`)
            // for common styling

            viewBtn.innerText = "view"
            viewBtn.addEventListener(
                'click', this.showResultGraph
            )
            viewBtn.setAttribute("class", 'minimal-button')
            viewBtn.style.padding = "0.3rem 0.3rem"
            resBtnCol.appendChild(viewBtn)
            row.appendChild(resBtnCol)
            tbody.appendChild(row);

            let auxRow = document.createElement("tr")
            auxRow.setAttribute("id", `auxRow-${key}`)
            auxRow.setAttribute("class", "hidden")
            let auxCol = document.createElement("td")
            auxCol.setAttribute("colspan", 6)
            auxRow.appendChild(auxCol)
            tbody.appendChild(auxRow)

            // add this.resulttable to auxCol
            const resulttable = document.querySelector("#result-table").cloneNode(true)

            resulttable.setAttribute("class", 'resulttable')

            const byNumSection = resulttable.querySelector("#blueyellow-numerical")
            const rgNumSection = resulttable.querySelector("#redgreen-numerical")
            const kwNumSection = resulttable.querySelector("#blackwhite-numerical")

            const by = resulttable.querySelector("#blueyellow")
            const byObj = by.querySelector("object")
            const rg = resulttable.querySelector("#redgreen")
            const rgObj = rg.querySelector("object")
            const kw = resulttable.querySelector("#blackwhite")
            const kwObj = kw.querySelector("object")


            if (o.rawgamedata[0].colorMode === 'kw') {
                // dont need by and rg
                by.parentNode.removeChild(by)
                rg.parentNode.removeChild(rg)

                // change remaining id to uniq
                // const kwId = this.genUniqId(kw, key)
                const kwObjId = this.genUniqId(kwObj, key)
                const kwNumId = this.genUniqId(kwNumSection, key)

                const resultObj = kw.querySelector(`#${kwObjId}`)
                resultObj.addEventListener('load', () => {
                    const svgDoc = resultObj.contentDocument
                    renderResult(svgDoc, o.rawgamedata)
                })
                resultObj.data = resultObj.data
                const numericalKw = resulttable.querySelector(`#${kwNumId}`)
                const numericalResultKw = createNumericalSummary(o.rawgamedata)
                numericalKw.innerHTML = parseNumResult(numericalResultKw)

            } else {
                // dont need kw 
                kw.parentNode.removeChild(kw)
                // const rgId = this.genUniqId(rg, key)
                // const byId = this.genUniqId(by, key)
                const rgObjId = this.genUniqId(rgObj, key)
                const byObjId = this.genUniqId(byObj, key)
                const rgNumId = this.genUniqId(rgNumSection, key)
                const byNumId = this.genUniqId(byNumSection, key)

                const blueyellow = o.rawgamedata.filter(function (resItem) {
                    return resItem.colorMode === "by"
                })

                const redgreen = o.rawgamedata.filter(function (resItem) {
                    return resItem.colorMode === "rg"
                })

                // blueyellow
                const resultObjBy = by.querySelector(`#${byObjId}`)
                resultObjBy.addEventListener('load', () => {
                    const svgDoc = resultObjBy.contentDocument
                    renderResult(svgDoc, blueyellow)
                })
                resultObjBy.data = resultObjBy.data
                const numericalBy = resulttable.querySelector(`#${byNumId}`)
                const numericalResultBy = createNumericalSummary(blueyellow)
                numericalBy.innerHTML = parseNumResult(numericalResultBy)

                // redgreen
                const resultObjRg = rg.querySelector(`#${rgObjId}`)
                resultObjRg.addEventListener('load', () => {
                    const svgDoc = resultObjRg.contentDocument
                    renderResult(svgDoc, redgreen)
                })
                resultObjRg.data = resultObjRg.data
                const numericalRg = resulttable.querySelector(`#${rgNumId}`)
                const numericalResultRg = createNumericalSummary(redgreen)
                numericalRg.innerHTML = parseNumResult(numericalResultRg)

            }

            auxCol.appendChild(resulttable)

        });
    }

    genUniqId = (el, key) => {
        const oldId = el.getAttribute("id")
        el.removeAttribute('id')
        const newId = `${oldId}-${key}`
        el.setAttribute('id', newId)
        return newId
    }


    showResultGraph = (ev) => {
        ev.preventDefault();
        // const auxRow = document.getElementById(`auxRow-${resultObj[0]["testtype"]}-${resultObj[0]["_id"]}`)

        const key = ev.target.id;
        const auxRow = document.getElementById(`auxRow-${key}`)
        auxRow.classList.contains('hidden') ? auxRow.classList.remove('hidden') : auxRow.classList.add('hidden')
    }

    /**
     * Change current page
     * @param {number} page - the new current page
     */
    changePage(page) {
        let start = this.perPage * (page - 1);
        let end = start + this.perPage;
        let sliced = this.data.slice(start, end);

        this.currPage = page;
        this.printData(sliced);
        this.getPgMessage();
        this.pagination();
    }

    /**
     * Filters entries by a given search key
     * @param {string} key - the given search key
     */
    search(key) {
        key = key.trim();
        let filtered = this.data.filter(d => {

            let cond = false;
            for (let k in d) {

                if (this.includeKey.includes(k)) {
                    cond = cond || String(d[k]).includes(key)
                }

            }
            return cond;
        });

        this.currPage = 1;

        if (filtered.length == 0) {
            let props = Object.keys(this.data[0]),
                noresRow = document.createElement("tr"),
                noresCol = document.createElement("td");

            noresCol.setAttribute("aria-live", "polite");
            noresCol.innerHTML = this.locale.NO_RESULT;
            noresCol.style.textAlign = "center";
            noresCol.colSpan = props.length;

            noresRow.appendChild(noresCol);
            this.el.querySelector("tbody").innerHTML = "";
            this.el.querySelector("tbody").appendChild(noresRow);
        }

        else
            this.printData(filtered.slice(0, this.perPage));

        this.pagination();
        this.getPgMessage();
    }
    /**
    * Creates DOM elements for pagination
    */
    pagination() {
        let list = document.createElement("div");
        list.classList.add(`${DT_PREFIX}__pagination`);

        let totPages = Math.ceil(this.data.length / this.perPage);

        if (this.currPage > 1) {
            let toFirst = document.createElement("button");
            toFirst.setAttribute("aria-controls", this.el.id);
            toFirst.setAttribute("aria-label", this.locale.GOTO_FIRST);
            toFirst.innerHTML = "&#10094;&#10094;";
            toFirst.classList.add("btn-char");

            toFirst.onclick = () => this.changePage(1);
            list.appendChild(toFirst);

            let toPrev = document.createElement("button");
            toPrev.setAttribute("aria-controls", this.el.id);
            toPrev.setAttribute("aria-label", this.locale.GOTO_PREV);
            toPrev.innerHTML = "&#10094;";
            toPrev.classList.add("btn-char");

            toPrev.onclick = () => this.changePage(this.currPage - 1);
            list.appendChild(toPrev);
        }

        for (let i = this.currPage - 2; i < this.currPage + 2; i++) {
            if (i < 1 || i > totPages)
                continue;

            let node = document.createElement("button");
            node.setAttribute("aria-controls", this.el.id);
            node.setAttribute("aria-label", this.locale.GOTO_PAGE.replace("{NUM}", i));
            node.classList.add("btn");
            node.innerHTML = i;

            if (i == this.currPage) node.setAttribute("aria-selected", true);
            else node.onclick = () => this.changePage(i);

            list.appendChild(node);
        }

        if (this.currPage < totPages) {
            let toNext = document.createElement("button");
            toNext.setAttribute("aria-controls", this.el.id);
            toNext.setAttribute("aria-label", this.locale.GOTO_NEXT);
            toNext.innerHTML = "&#10095;";
            toNext.classList.add("btn-char");

            toNext.onclick = () => this.changePage(this.currPage + 1);
            list.appendChild(toNext);

            let toLast = document.createElement("button");
            toLast.setAttribute("aria-controls", this.el.id);
            toLast.setAttribute("aria-label", this.locale.GOTO_LAST);
            toLast.innerHTML = "&#10095;&#10095;";
            toLast.classList.add("btn-char");

            toLast.onclick = () => this.changePage(totPages);
            list.appendChild(toLast);
        }

        document.querySelector(`#${this.el.id}_pagination`).innerHTML = "";
        document.querySelector(`#${this.el.id}_pagination`)
            .appendChild(list);
    }

    /**
     * Sorts and rearranges data into the table, by given property and way
     * @param {string} prop - the property, according to which, to sort data 
     * @param {1 | -1} way - sorting way, can be either 1 for "ascending" or -1 for "descending" 
     */
    changeOrder(colhead, way) {
        let prop = ColName2ObjectKey[colhead]
        let start = this.perPage * (this.currPage - 1),
            end = this.data.length > this.perPage ? start + this.perPage : this.data.length,
            sorted = this.data.sort((a, b) => a[prop] > b[prop] ? way : -way);

        this.printData(sorted.slice(start, end));
    }


    /**
     * Toggles table's column header to change sorting according to it
     * @param {NodeListOf<HTMLTableHeaderCellElement>} heads - List of table headers' DOM elements
     * @param {HTMLTableHeaderCellElement} th - the target table header
     */
    toggleHead(heads, th) {
        let prevStatus = th.getAttribute("aria-sort") || "";

        heads.forEach(v => {
            v.removeAttribute("aria-sort");
            v.setAttribute("aria-label", `${v.innerText}: non attivo`);
        });

        if (prevStatus.length == 0 || prevStatus[0] == 'd') {
            th.setAttribute("aria-sort", "ascending");
            th.setAttribute("aria-label", `${th.innerText}: ${this.locale.ASC_ACTIVE}`);
            this.changeOrder(th.innerText, 1);
        }

        else {
            th.setAttribute("aria-sort", "descending");
            th.setAttribute("aria-label", `${th.innerText}: ${this.locale.DESC_ACTIVE}`);
            this.changeOrder(th.innerText, -1);
        }
    }

    /**
     * Builds all the component's logical and DOM structure
     */


    init() {
        this.hasSearch = this.el.dataset.search;
        this.locale = DT_LOCALES[this.el.dataset.locale];
        this.checkId();
        // limitating elements to page

        this.printData(this.data.slice(0, this.perPage));
        // creating container
        let cont = document.createElement("div");
        cont.classList.add(DT_PREFIX);
        // top panel
        let panel = document.createElement("div");
        panel.classList.add(`${DT_PREFIX}__panel`);

        let leftCol = document.createElement("div");

        let ppChoose = document.createElement("select");
        ppChoose.classList.add(`${DT_PREFIX}__select`);
        let ppStr = document.createElement("span");
        ppStr.innerHTML = this.locale.PER_PAGE;

        for (let i = 1; i <= 5; i++)
            ppChoose.innerHTML +=
                `<option ${i == 1 ? 'selected' : ''} value='${i * 10}'>
                    ${i * 10}
                </option>`;

        ppChoose.onchange = () => {
            this.perPage = parseInt(ppChoose.value);
            this.changePage(1);
        };

        leftCol.appendChild(ppChoose);
        leftCol.appendChild(ppStr);

        panel.appendChild(leftCol);

        if (this.hasSearch) {
            let rightCol = document.createElement("div");

            let searchInput = document.createElement("input");
            searchInput.setAttribute("aria-controls", this.el.id);
            searchInput.classList.add(`${DT_PREFIX}__search`);
            searchInput.setAttribute("role", "searchbox");
            searchInput.placeholder = this.locale.SEARCH;
            searchInput.classList.add("control");
            searchInput.type = "search";

            searchInput.addEventListener("input", () =>
                this.search(searchInput.value)
            )

            rightCol.appendChild(searchInput);
            panel.appendChild(rightCol);
        }

        cont.appendChild(panel);

        // sorting headers
        let heads = this.el.querySelectorAll("thead th");
        heads.forEach(th => {
            th.setAttribute("tabindex", 0);
            th.setAttribute("scope", "col");
            th.setAttribute("aria-controls", this.el.id);
            th.setAttribute("aria-label", `${th.innerText}: ${this.locale.NOT_ACTIVE}`);

            th.addEventListener("click", () => this.toggleHead(heads, th));

            th.addEventListener("keyup", e => {
                if (document.activeElement == th && e.key == "Enter")
                    this.toggleHead(heads, th);
            });
        });

        // inserting container
        let tableCont = document.createElement("div");
        tableCont.classList.add(`${DT_PREFIX}__table`);

        this.el.parentElement.insertBefore(cont, this.el);
        cont.appendChild(tableCont);
        tableCont.appendChild(this.el);

        // pagination
        let pagPanel = document.createElement("div");
        pagPanel.classList.add(`${DT_PREFIX}__panel`);

        let pgLcol = document.createElement("div");
        pgLcol.setAttribute("aria-live", "polite");
        pgLcol.id = `${this.el.id}_pgdisplay`;

        pagPanel.appendChild(pgLcol);

        let pgRCol = document.createElement("div");
        pgRCol.id = `${this.el.id}_pagination`;

        pagPanel.appendChild(pgRCol);
        cont.appendChild(pagPanel);

        this.pagination();
        this.getPgMessage();

        this.el.removeAttribute("data-search");
        this.el.removeAttribute("data-locale");
        this.el.removeAttribute("data-replace");

    }
}

