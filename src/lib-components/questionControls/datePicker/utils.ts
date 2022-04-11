import dayjs from "dayjs";

export let formatDateString = (date?: Date): string | undefined => {
  if (!date) return undefined;
  // NOTE: does not handle timezone, but we don't want to
  // because admin timezone cause different output in
  // client side
  return date.toISOString().split("T")[0];
};

export let getDateByPropertyValue = (
  date?: string | Date
): Date | undefined => {
  if (!date) {
    return undefined;
  }
  if (date instanceof Date) {
    return date;
  }
  const parsedDate = Date.parse(date);
  if (!isNaN(parsedDate)) {
    // is a proper date timestamp, return date with it
    return new Date(parsedDate);
  }

  // if date string === Date.now or new Date, return current date
  if (/^Date.now(\(\))*$/.test(date) || /^new Date(\(\))*$/.test(date)) {
    return new Date();
  }

  // if it is a dayjs handling, run it through dayjs
  if (/(^dayjs|^[\w]+\([^\)]*\))/.test(date)) {
    return date
      .split(".")
      .reduce((accDate, part) => {
        const parts = part.match(/([\w]+)\(([^\)]*)\)/);

        if (!parts) return accDate;
        switch (parts[1]) {
          case "dayjs":
            if (parts[2]) return dayjs(parts[2]);
            return accDate;
          default:
            return (accDate as any)[parts[1]](
              ...parts[2].split(/\s*,\s*/).map((a) => {
                const parsedNum = parseFloat(a);
                if (isNaN(parsedNum)) {
                  return a.replaceAll(/[\'\"]+/g, "");
                } else {
                  return parsedNum;
                }
              })
            );
        }
      }, dayjs())
      .toDate();
  }

  return undefined;
};
