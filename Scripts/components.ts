import Litepicker from "litepicker";
import 'litepicker/dist/plugins/ranges';

export function createDateRangePicker(element: HTMLElement,
                                      dotNetRef: any,
                                      startDate: string | null,
                                      endDate: string | null,
                                      minDate: string,
                                      maxDate: string,
                                      minYear: number,
                                      maxYear: number): Litepicker | null {
    try {
        const picker = new Litepicker({
            element: element,
            startDate: startDate ?? undefined,
            endDate: endDate ?? undefined,
            firstDay: 0,
            numberOfColumns: 2,
            numberOfMonths: 2,
            switchingMonths: 1,
            resetButton: true,
            singleMode: false,
            minDate: minDate,
            maxDate: maxDate,
            dropdowns: { "minYear": minYear, "maxYear": maxYear, "months": true, "years": true },
            plugins: ['ranges']
        });

        picker.on("selected",
            async (startDate: Date, endDate: Date) => {
                await dotNetRef.invokeMethodAsync("JsDateRangeSelected",
                    startDate.toDateString(),
                    endDate.toDateString());
            });
        return picker;
    } catch (error) {
        console.log(error);
        return null;
    }
}