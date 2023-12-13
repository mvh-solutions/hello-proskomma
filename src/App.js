import {React, useEffect, useState} from "react";
import {Proskomma} from "proskomma-core";

const pk = new Proskomma();
const usfm = `
\\id PSA unfoldingWord® Simplified Text (truncated by Mark)
\\ide UTF-8
\\toc1 The Book of Psalms
\\mt1 Psalms
\\c 150
\\q1
\\v 1 Praise Yahweh!
\\q1 Praise God in his temple!
\\q2 Praise him who is in his fortress in heaven!
\\q1
\\v 2 Praise him for the mighty deeds that he has performed;
\\q2 praise him because he is very great!
\\q1
\\v 3 Praise him by blowing trumpets loudly;
\\q2 praise him by playing harps and small stringed instruments!
\\q1
\\v 4 Praise him by beating drums and by dancing.
\\q2 Praise him by playing stringed instruments and by playing flutes!
\\q1
\\v 5 Praise him by clashing cymbals;
\\q2 praise him by clashing very loud cymbals!
\\q1
\\v 6 I want all living creatures to praise Yahweh!
\\q1 Praise Yahweh!
`;
pk.importDocument({lang: "eng", abbr: "ust"}, "usfm", usfm);

const initialQuery = `{
  id
  processor
  documents {
    id
    book: header(id: "bookCode")
    title: header(id: "toc")
    mainBlocksText
  }
}`;

function App() {
    const [query, setQuery] = useState(initialQuery);
    const [result, setResult] = useState({});
    useEffect(
        () => {
            const res = pk.gqlQuerySync(query);
            setResult(res);
        },
        [query]
    );
    return (
        <div className="App">
            <h1>Hello Proskomma</h1>
            <textarea
                rows="10"
                cols="40"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <div><pre>{JSON.stringify(result, null, 2)}</pre></div>
        </div>
    );
}

export default App;
