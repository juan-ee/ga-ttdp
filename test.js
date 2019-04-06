const { evolve } = require("./index");

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



console.log(evolve({
  pois,
  populationSize: 50,
  timeMatrix: time_matrix,
  date: new Date(),
  totalGenerations: 5,
  mutation_rate: 0.3
}));
