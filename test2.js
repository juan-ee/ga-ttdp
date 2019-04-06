const { GeneticAlgorithm } = require("./src/ga_class");

const time_matrix = [
  [
    null,
    {
      duration: 27.2,
      points:
        "jfh@|nc\\x7eMsAtFa@|Af@DzFv@zB^|Cx@RLnBxA|B|Av@v@pC|BtBdBjAx@hGhFjAbAj@f@cBdCaB|B`Av@bEjDdF~DHLBFvEvDz@t@"
    },
    {
      duration: 28.45,
      points:
        "jfh@|nc\\x7eMsAtFa@|Af@DzFv@zB^|Cx@RLnBxA|B|Av@v@pC|BtBdBjAx@hGhFjAbAj@f@cBdC~FjEdCnB_BnCiE~G`AbAxApAlBfA"
    },
    {
      duration: 30.7,
      points:
        "jfh@|nc\\x7eMsAtFa@|Af@DzFv@zB^|Cx@RLnBxA|B|Av@v@pC|BtBdBjAx@hGhFjAbAj@f@cBdC~FjEdCnB_BnCaBfCjB`BBFfAdA`BxAVRvAlA`At@ONy@dAdAv@"
    },
    {
      duration: 21.666666666666668,
      points:
        "jfh@|nc\\x7eMPu@f@PnDjAz@uA\\RfB|@`DtAdCtAvDdC|B~Ap@h@PLHTn@j@bB|AT\\Ph@Hf@XBrGvEvBfBvB`BhAv@`A|@bBnA`C~A~BfBQV"
    },
    {
      duration: 24.783333333333335,
      points:
        "jfh@|nc\\x7eMsAtFa@|Af@DzFv@zB^|Cx@RLnBxA|B|Av@v@pC|BtBdBjAx@hGhFjAbAj@f@cBdCaB|B`Av@bEjDdF~DHLBFML"
    },
    {
      duration: 23.916666666666668,
      points:
        "jfh@|nc\\x7eMPu@yC}@gDcAn@kCL[jATLETARAPMn@iD?]MuANcBRqAbAkAtAyAYc@Yo@?_@HWPW\\e@JO[q@TKm@aAi@s@wCaFI]I[Sa@uA_Co@mAeAuBoA{Bq@qAhAm@JLBAB?@@HDBFb@LVKT^Vb@u@`@?BR`@"
    }
  ],
  [
    "~0~1",
    null,
    { duration: 3.25, points: "jgj@fwe\\x7eM{@u@yB`Cu@z@q@n@I?]S" },
    {
      duration: 3.8833333333333333,
      points: "jgj@fwe\\x7eMvAnAGJkBrB_@^i@t@dAv@"
    },
    {
      duration: 6.216666666666667,
      points: "jgj@fwe\\x7eM{@u@bCiC|CcDdAgAU[uBmBZi@`@s@\\k@"
    },
    { duration: 2.5166666666666666, points: "jgj@fwe\\x7eMkCyBgCsBML" },
    {
      duration: 40.95,
      points:
        "jgj@fwe\\x7eMkCyBgCsBCGCGiB{AhCsEp@iAeCoBsBaBw@aBg@y@oAoCcAaD[oA]eBYeBQi@k@u@oBeBMKIUc@]Mq@?m@Ei@mAgE}CqJm@mBUg@UcAi@}Ae@kAa@}@{@}A]i@m@u@a@c@}AgAo@a@m@i@SSi@_ARM}@eBcA_BkDwFSy@gAkBw@yAmDuGs@wAhAm@JLBAB?B@JLb@LVKh@|@BDq@\\CDRb@"
    }
  ],
  [
    "~0~2",
    "~1~2",
    null,
    {
      duration: 4.333333333333333,
      points: "d}i@j|e\\x7eMb@THC`BiBvAlA`At@ONy@dAdAv@"
    },
    {
      duration: 8.05,
      points: "d}i@j|e\\x7eMb@THC`BiBxJkKz@_Aj@k@U[uBmBLQ\\m@n@iA"
    },
    {
      duration: 3.966666666666667,
      points: "d}i@j|e\\x7eMb@THC`BiBaEsDCG`AsAV["
    },
    {
      duration: 42.05,
      points:
        "d}i@j|e\\x7eMuAy@u@e@aB_B[]fBwC`BgC~AoCzAmCyFqEw@aBc@o@m@oAm@uAaAkDe@gB]uBQ_AS_@SY}@y@eAaAIQQMOMIICQGUCS@k@QcAwAuE}@wCcBiFa@gAUw@Su@aAgCc@cAmAwBYa@s@y@w@o@iAu@oAaA_@i@Uc@RMkBgDi@s@wCaFI]I[Sa@uA_Co@mAeAuBoA{Bq@qAhAm@JLBAB?@@HDBFb@LVKT^Vb@u@`@?BR`@"
    }
  ],
  [
    "~0~3",
    "~1~3",
    "~2~3",
    null,
    {
      duration: 9.25,
      points:
        "jfj@dbf\\x7eMeAw@h@u@^_@jBsBbCiDjBgCHQb@k@Z]?Ia@c@{@kAU[uBmBZi@`@s@\\k@"
    },
    {
      duration: 5.383333333333334,
      points: "jfj@dbf\\x7eMeAw@h@u@^_@{CeC_EqDCG`AsAV["
    },
    {
      duration: 44.016666666666666,
      points:
        "jfj@dbf\\x7eMeAw@h@u@^_@{CeC_EqDCGkBaB`BgC~AoCzAmCyFqEw@aBc@o@m@oAm@uAaAkDe@gB]uBQ_AS_@SY}@y@eAaAIQQMOMIICQGUCS@k@QcAwAuE}@wCcBiFa@gAUw@Su@aAgCc@cAmAwBYa@s@y@w@o@iAu@oAaA_@i@Uc@RMkBgDi@s@wCaFI]I[Sa@uA_Co@mAeAuBoA{Bq@qAhAm@JLBAB?@@HDBFb@LVKT^Vb@u@`@?BR`@"
    }
  ],
  [
    "~0~4",
    "~1~4",
    "~2~4",
    "~3~4",
    null,
    {
      duration: 7.516666666666667,
      points: "foj@fae\\x7eM_A~A[h@sBcBIGOVsAzBKNyAxBG@KHGFWb@IFIHAP]r@QR"
    },
    {
      duration: 37.21666666666667,
      points:
        "foj@fae\\x7eMPW_CgBaC_BcBoAi@g@aBmAwBaBwBgBsGwEIa@Gm@Ie@COOKeAw@CMIMmAuAMSy@{BqA{DuCaJy@qCc@oBuAmEwAuCUUkAaA_BkA{AeAQWiBcDcA_BkDwFSy@gAkBw@yAmDuGs@wAhAm@JLBAB?B@JLb@LVKh@|@BDq@\\CDRb@"
    }
  ],
  [
    "~0~5",
    "~1~5",
    "~2~5",
    "~3~5",
    "~4~5",
    null,
    {
      duration: 38.7,
      points:
        "h\\x7ei@fpe~MLMCGCGiB{AhCsEp@iAeCoBsBaBw@aBg@y@oAoCcAaD[oA]eBYeBQi@U]cB}Ao@k@IUQMQOG[EU?U?WEi@mAgEo@mB{CqJUg@UcAi@}Ae@kAa@}@{@}A]i@oAyA}AgAo@a@aA}@i@_ARM}@eBcA_BkDwFSy@gAkB_CkEyC{FhAm@JLBAF@JLb@LVKh@|@BDq@\\CD?BR^"
    }
  ],
  ["~0~6", "~1~6", "~2~6", "~3~6", "~4~6", "~5~6", null]
];


for (let i=0; i<time_matrix.length; i++){
    for (let j=0; j<time_matrix.length; j++){
        if(typeof time_matrix[i][j] === "string")
            time_matrix[i][j] = {...time_matrix[j][i]};
    }
}


const pois = [
  { location: { lat: -0.211276, lng: -78.502451 } },
  {
    formatted_address: "760, García Moreno, Quito 170401, Ecuador",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
    id: "42724f1738d353cfb92a99f7ddc6ccd52f18a150",
    name: "Museum Of Maria Augusta Urrutia",
    opening_hours: {
      open_now: false,
      periods: [
        { open: "0930", close: "1730" },
        null,
        { open: "1000", close: "1800" },
        { open: "1000", close: "1800" },
        { open: "1000", close: "1800" },
        { open: "1000", close: "1800" },
        { open: "0930", close: "1730" }
      ],
      weekday_text: [
        "Monday: Closed",
        "Tuesday: 10:00 AM – 6:00 PM",
        "Wednesday: 10:00 AM – 6:00 PM",
        "Thursday: 10:00 AM – 6:00 PM",
        "Friday: 10:00 AM – 6:00 PM",
        "Saturday: 9:30 AM – 5:30 PM",
        "Sunday: 9:30 AM – 5:30 PM"
      ]
    },
    place_id: "ChIJgT1rNiia1ZERMJOiHS85FnI",
    plus_code: {
      compound_code: "QFHP+9C Centro Histórico, Quito, Ecuador",
      global_code: "67F3QFHP+9C"
    },
    rating: 5,
    url: "https://maps.google.com/?cid=8220821044334859056",
    utc_offset: -300,
    vicinity: "760, García Moreno, Quito",
    location: { lat: -0.2215442, lng: -78.5139068 },
    expected_time: 90,
    lat: -0.2215442,
    lng: -78.5139068
  },
  {
    formatted_address: "Calle Cuenca 477 y Sucre, Quito 170401, Ecuador",
    formatted_phone_number: "(02) 228-1124",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
    id: "a55ece28ef9f81ce5a66372081a28fb4948e4eb9",
    international_phone_number: "+593 2-228-1124",
    name: "Convento De San Francisco",
    place_id: "ChIJ6VlgAyma1ZERqyAD4VpKP-g",
    plus_code: {
      compound_code: "QFJM+2W Centro Histórico, Quito, Ecuador",
      global_code: "67F3QFJM+2W"
    },
    rating: 4.7,
    url: "https://maps.google.com/?cid=16735176494514643115",
    utc_offset: -300,
    vicinity: "Calle Cuenca 477 y Sucre, Quito",
    website: "http://conventodesanfrancisco.com/",
    location: { lat: -0.2198965, lng: -78.51513369999999 },
    expected_time: 31,
    lat: -0.2198965,
    lng: -78.51513369999999
  },
  {
    formatted_address: "Cuenca N1-41 y, Quito 170401, Ecuador",
    formatted_phone_number: "(02) 228-0772",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
    id: "4aaf4c90522882dbad3f19249b4297be1770561a",
    international_phone_number: "+593 2-228-0772",
    name: "Pre-Columbian Art Museum House of Praise",
    opening_hours: {
      open_now: false,
      periods: [
        { open: "0900", close: "1730" },
        { open: "0900", close: "1730" },
        { open: "0900", close: "1730" },
        { open: "1330", close: "1730" },
        { open: "0900", close: "1730" },
        { open: "0900", close: "1730" },
        { open: "0900", close: "1730" }
      ],
      weekday_text: [
        "Monday: 9:00 AM – 5:30 PM",
        "Tuesday: 9:00 AM – 5:30 PM",
        "Wednesday: 1:30 – 5:30 PM",
        "Thursday: 9:00 AM – 5:30 PM",
        "Friday: 9:00 AM – 5:30 PM",
        "Saturday: 9:00 AM – 5:30 PM",
        "Sunday: 9:00 AM – 5:30 PM"
      ]
    },
    place_id: "ChIJDYz5wICZ1ZERzgHFEKiSWL4",
    plus_code: {
      compound_code: "QFHM+FM San Roque, Quito, Ecuador",
      global_code: "67F3QFHM+FM"
    },
    rating: 4.7,
    url: "https://maps.google.com/?cid=13715873915690353102",
    utc_offset: -300,
    vicinity: "Cuenca N1-41 y, Quito",
    website: "http://alabado.org/",
    location: { lat: -0.2212529999999999, lng: -78.515811 },
    expected_time: 85,
    lat: -0.2212529999999999,
    lng: -78.515811
  },
  {
    formatted_address: "Junín Oe1-13 y, Montufar, Quito 170401, Ecuador",
    formatted_phone_number: "098 328 9590",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
    id: "0e9fe679058afcbe832655d3e7ca1d82b6a61570",
    international_phone_number: "+593 98 328 9590",
    name: "Manuela Sáenz Museum",
    opening_hours: {
      open_now: false,
      periods: [
        { open: "1000", close: "1600" },
        null,
        null,
        { open: "1000", close: "1700" },
        { open: "1000", close: "1700" },
        { open: "1000", close: "1700" },
        { open: "1000", close: "1600" }
      ],
      weekday_text: [
        "Monday: Closed",
        "Tuesday: Closed",
        "Wednesday: 10:00 AM – 5:00 PM",
        "Thursday: 10:00 AM – 5:00 PM",
        "Friday: 10:00 AM – 5:00 PM",
        "Saturday: 10:00 AM – 4:00 PM",
        "Sunday: 10:00 AM – 4:00 PM"
      ]
    },
    place_id: "ChIJKyqzqIiZ1ZEREnjs_8fBwUY",
    plus_code: {
      compound_code: "QFGQ+VR San Marcos, Quito, Ecuador",
      global_code: "67F3QFGQ+VR"
    },
    rating: 4.6,
    url: "https://maps.google.com/?cid=5098569317896452114",
    utc_offset: -300,
    vicinity: "Junín Oe1-13 y, Montufar, Quito",
    website: "https://museo-manuela-saenz.negocio.site/",
    location: { lat: -0.2228343, lng: -78.5104958 },
    expected_time: 90,
    lat: -0.2228343,
    lng: -78.5104958
  },
  {
    formatted_address: "Gonzalez Suarez, Quito 170401, Ecuador",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
    id: "32391e1d0ecea190ccf362939ccc1a2b582a18a3",
    name: "Museum of the Presidency",
    opening_hours: {
      open_now: false,
      periods: [
        { open: "0900", close: "1600" },
        null,
        { open: "0900", close: "1845" },
        { open: "0900", close: "1845" },
        { open: "0900", close: "1845" },
        { open: "0900", close: "1845" },
        { open: "0900", close: "2200" }
      ],
      weekday_text: [
        "Monday: Closed",
        "Tuesday: 9:00 AM – 6:45 PM",
        "Wednesday: 9:00 AM – 6:45 PM",
        "Thursday: 9:00 AM – 6:45 PM",
        "Friday: 9:00 AM – 6:45 PM",
        "Saturday: 9:00 AM – 10:00 PM",
        "Sunday: 9:00 AM – 4:00 PM"
      ]
    },
    place_id: "ChIJ1-7g1yma1ZERpdbHr_2MT2M",
    plus_code: {
      compound_code: "QFJP+2V Centro Histórico, Quito, Ecuador",
      global_code: "67F3QFJP+2V"
    },
    rating: 4.6,
    url: "https://maps.google.com/?cid=7156093354118731429",
    utc_offset: -300,
    vicinity: "Gonzalez Suarez, Quito",
    website: "http://www.presidencia.gob.ec/museo/",
    location: { lat: -0.2199577, lng: -78.5127576 },
    expected_time: 78,
    lat: -0.2199577,
    lng: -78.5127576
  },
  {
    formatted_address:
      "Avenida 12 de Octubre 1076 y Vicente Ramón Roca. Edificio del Centro Cultural 2do. piso., Quito 170143, Ecuador",
    formatted_phone_number: "(02) 299-1700",
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/museum-71.png",
    id: "e6fd2b182e4b518d19a259959e092a6d669b05e6",
    international_phone_number: "+593 2-299-1700",
    name: "Museo Jacinto Jijón y Caamaño",
    opening_hours: {
      open_now: false,
      periods: [
        null,
        { open: "0900", close: "1630" },
        { open: "0900", close: "1630" },
        { open: "0900", close: "1630" },
        { open: "0900", close: "1630" },
        { open: "0900", close: "1630" },
        null
      ],
      weekday_text: [
        "Monday: 9:00 AM – 4:30 PM",
        "Tuesday: 9:00 AM – 4:30 PM",
        "Wednesday: 9:00 AM – 4:30 PM",
        "Thursday: 9:00 AM – 4:30 PM",
        "Friday: 9:00 AM – 4:30 PM",
        "Saturday: Closed",
        "Sunday: Closed"
      ]
    },
    place_id: "ChIJe4sJ-RCa1ZERJ02VZbxdYts",
    plus_code: {
      compound_code: "QGR5+34 La Floresta, Quito, Ecuador",
      global_code: "67F3QGR5+34"
    },
    rating: 4.6,
    url: "https://maps.google.com/?cid=15808300705763380519",
    utc_offset: -300,
    vicinity:
      "Avenida 12 de Octubre 1076 y Vicente Ramón Roca. Edificio del Centro Cultural 2do. piso., Quito",
    location: { lat: -0.209808, lng: -78.492148 },
    expected_time: 68,
    lat: -0.209808,
    lng: -78.492148
  }
];

const ga = new GeneticAlgorithm({
      pois,
      populationSize: 50,
      timeMatrix: time_matrix,
      date: new Date(),
      totalGenerations: 5,
      mutation_rate: 0.3
});


console.log(ga.evolve());
