export function formatDate(date: string | Date): string {

  // Check if the date is valid
    if (date ==="" ) {
        throw new Error("Invalid date provided");
    }


    const d = new Date(date)

    // Check if the date is valid
    if (isNaN(d.getTime())) {
        throw new Error("Invalid date provided");
    }

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }).format(d);
}