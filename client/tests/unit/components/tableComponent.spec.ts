import { mount } from "@vue/test-utils";
import TableComponent from "../../../src/components/common/TableComponent.vue";

describe("TableComponent", () => {
  it("renders the table with correct columns", () => {
    const columns = [
      { key: "id", label: "Customer ID" },
      { key: "Name ▲", label: "Name" },
      { key: "email ▲", label: "Email" },
    ];
    const data = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    const wrapper = mount(TableComponent, {
      props: { columns, data, sortableColumns: ["name", "email"] },
    });

    // Assert the table header contains the correct column labels
    const thElements = wrapper.findAll("th");
    columns.forEach((column, index) => {
      expect(thElements[index].text()).toBe(column.label);
    });

  })

  it("sorts the data correctly when a sortable column header is clicked", async () => {
    const columns = [
      { key: "id", label: "Customer ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
    ];
    const data = [
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
      { id: 1, name: "John Doe", email: "john@example.com" },
    ];

    const wrapper = mount(TableComponent, {
      props: { columns, data, sortableColumns: ["name", "email"] },
    });

    // Click on the "Name" column header to sort in ascending order
    await wrapper.find("th[data-column-key='name']").trigger("click");

    // Assert that the data is sorted correctly
    const tdElements = wrapper.findAll("td");
    expect(tdElements[1].text()).toBe("Jane Smith");
    expect(tdElements[4].text()).toBe("John Doe");

    // Click on the "Name" column header again to sort in descending order
    await wrapper.find("th[data-column-key='name']").trigger("click");

    // Assert that the data is sorted correctly
    const reversedTdElements = wrapper.findAll("td");
    expect(reversedTdElements[1].text()).toBe("John Doe");
    expect(reversedTdElements[4].text()).toBe("Jane Smith");
  });


})
