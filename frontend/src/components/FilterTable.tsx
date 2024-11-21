import { Checkbox, Table } from "flowbite-react";

const FilterTable = () => {
  const testData = [
    {
      "swiss-id": 1,
      title: "Test Title",
      language: "French",
      "resource-type": "journal",
      "issue-date": "12-10-20204",
    },
    {
      "swiss-id": 2,
      title: "Test Title 2",
      language: "English",
      "resource-type": "journal",
      "issue-date": "12-10-20204",
    },
    {
      "swiss-id": 3,
      title: "Test Title 3",
      language: "French",
      "resource-type": "journal",
      "issue-date": "12-10-20204",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>Swiss Id</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Language</Table.HeadCell>
          <Table.HeadCell>Resource Type</Table.HeadCell>
          <Table.HeadCell>Issue Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {testData.map((element) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={element["swiss-id"]}
              >
                <Table.Cell className="p-4">
                  <Checkbox
                    onClick={(e) => {
                      console.log(e);
                    }}
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {element["swiss-id"]}
                </Table.Cell>
                <Table.Cell>{element.title}</Table.Cell>
                <Table.Cell>{element.language}</Table.Cell>
                <Table.Cell>{element["resource-type"]}</Table.Cell>
                <Table.Cell>{element["issue-date"]}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default FilterTable;
