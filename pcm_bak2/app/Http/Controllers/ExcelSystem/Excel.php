<?php

namespace App\Http\Controllers\ExcelSystem;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\configTables;

Class Excel 
{
    public function CreateExcel($sheetTitle, $columnTitles, $sheetDatas, $path, $excelName)
    {   
        $spreadsheet = new Spreadsheet();
		$worksheet = $spreadsheet->getActiveSheet();
		$worksheet->setTitle($sheetTitle);
		foreach ($columnTitles as $key=>$columnTitle) {
			$worksheet->setCellValueByColumnAndRow($key+1, 1, $columnTitle);
		}
		foreach ($sheetDatas as $key=>$sheetData) {
			foreach ($sheetData as $key1=>$singleData) {
				$worksheet->setCellValueByColumnAndRow($key1+1, $key+2, $singleData);
			}
		}
		$writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
		$writer->save($path."/".$excelName);
        unset($spreadsheet);
        unset($worksheet);
    }

     public function ReadExcel($path) {
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($path);
        $sheetAllDatas = $spreadsheet->getActiveSheet()->toArray(null, true, true, false);
        $sheetDatas = array_shift($sheetAllDatas);
        $sheet = [];
        $sheet[0] = $sheetDatas;
        $sheet[1] = $sheetAllDatas;

        return $sheet;

    }

    public function UpdateToDatabase($tables, $datas, $databaseTable, $databases)
    {   
        $dataTable = new configTables($databaseTable, $databases);
        $newdDatas = [];
        $i = 0;
        foreach ($datas as $data) {
            foreach ($data as $key=>$value) {
                $newdDatas[$i][$tables[$key]] = $value;
            }
            $i++;
        }
        for ($j=0;$j<count($newdDatas);$j++) {
            if (implode("", $newdDatas[$j]) != "") {
                $dataTable->insert($newdDatas[$j]);  
            }
        }
        unset($dataTable);
        return true;
        
    }

}
