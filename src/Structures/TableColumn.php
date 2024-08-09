<?php

namespace Narsil\Table\Structures;

#region USE

use Narsil\Localization\Models\Translation;
use Narsil\Table\Constants\DBTypes;
use Narsil\Table\Constants\Types;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
final class TableColumn
{
    #region CONSTRUCTOR

    /**
     * @param array $column
     * @param array $foreignKeys
     * @param array $indexes
     *
     * @return void
     */
    public function __construct(
        array $column,
        array $foreignKeys,
        array $indexes,
    )
    {
        $this->comment = $column[self::COMMENT];
        $this->name = $column[self::NAME];
        $this->typeName = $column[self::TYPE_NAME];

        $this->auto = $this->getAuto($column);
        $this->foreignTable = $this->getForeignTable($foreignKeys);
        $this->length = $this->getLength($column);
        $this->required = $this->getRequired($column);
        $this->unique = $this->getUnique($indexes);

        $this->type = $this->getType();
    }

    #endregion

    #region CONSTANTS

    /**
     * @var string
     */
    private const AUTO_INCREMENT = 'auto_increment';
    /**
     * @var string
     */
    private const COLUMNS = 'columns';
    /**
     * @var string
     */
    private const COMMENT = 'comment';
    /**
     * @var string
     */
    private const DEFAULT = 'default';
    /**
     * @var string
     */
    private const FOREIGN_TABLE = 'foreign_table';
    /**
     * @var string
     */
    private const NAME = 'name';
    /**
     * @var string
     */
    private const NULLABLE = 'nullable';
    /**
     * @var string
     */
    private const TYPE = 'type';
    /**
     * @var string
     */
    private const TYPE_NAME = 'type_name';

    #endregion

    #region PROPERTIES

    /**
     * @var bool
     */
    public readonly bool $auto;
    /**
     * @var string|null
     */
    public readonly string|null $comment;
    /**
     * @var string|null
     */
    public readonly string|null $foreignTable;
    /**
     * @var int
     */
    public readonly int $length;
    /**
     * @var string
     */
    public readonly string $name;
    /**
     * @var bool
     */
    public readonly bool $required;
    /**
     * @var string
     */
    public readonly string $type;
    /**
     * @var string
     */
    public readonly string $typeName;
    /**
     * @var bool
     */
    public readonly bool $unique;

    #endregion

    #region PRIVATE METHODS

    /**
     * @param array $column
     *
     * @return bool
     */
    private function getAuto(array $column): bool
    {
        $auto = false;

        if ($column[self::AUTO_INCREMENT] || $column[self::TYPE] === DBTypes::TIMESTAMP)
        {
            $auto = true;
        }

        return $auto;
    }

    /**
     * @param array $foreignKeys
     *
     * @return string|null
     */
    private function getForeignTable(array $foreignKeys): string|null
    {
        $foreignTable = null;

        foreach ($foreignKeys as $foreignKey)
        {
            if (in_array($this->name, $foreignKey[self::COLUMNS]))
            {
                $foreignTable = $foreignKey[self::FOREIGN_TABLE];

                break;
            }
        }

        return $foreignTable;
    }

    /**
     * @param array $column
     *
     * @return int
     */
    private function getLength(array $column): int
    {
        $length = 0;

        if (preg_match('/\d+/', $column[self::TYPE], $matches))
        {
            $length = (int)$matches[0];
        }

        return $length;
    }

    /**
     * @param array $column
     *
     * @return bool
     */
    private function getRequired(array $column): bool
    {
        $default = $column[self::DEFAULT];
        $nullable = $column[self::NULLABLE];

        $required = $default === null && !$nullable;

        return $required;
    }

    /**
     * @return string
     */
    private function getType(): string
    {
        switch ($this->foreignTable)
        {
            case Translation::TABLE:
                return Types::TRANS;
        }

        switch ($this->comment)
        {
            case Types::COLOR:
                return Types::COLOR;
            case Types::ICON:
                return Types::ICON;
        }

        switch ($this->typeName)
        {
            case DBTypes::BIGINT:
            case DBTypes::INT:
            case DBTypes::SMALLINT:
            case DBTypes::MEDIUMINT:
                return Types::INTEGER;
            case DBTypes::TINYINT:
                return Types::BOOLEAN;
            case DBTypes::DATE:
                return Types::DATE;
            case DBTypes::DATETIME:
            case DBTypes::TIMESTAMP:
                return Types::DATETIME_LOCAL;
            case DBTypes::DECIMAL:
            case DBTypes::DOUBLE:
            case DBTypes::FLOAT:
                return Types::FLOAT;
            case DBTypes::JSON:
                return Types::JSON;
            case DBTypes::VARCHAR:
                return Types::STRING;
            case DBTypes::TEXT:
            case DBTypes::VARCHAR:
                return Types::TEXT;
            case DBTypes::TIME:
                return Types::TIME;
            default:
                return dd($this->type);
        }
    }

    /**
     * @param array $indexes
     *
     * @return bool
     */
    private function getUnique(array $indexes): bool
    {
        $unique = false;

        foreach ($indexes as $index)
        {
            $columns = $index['columns'];

            if ($index['unique'] && in_array($this->name, $columns))
            {
                $unique = true;

                break;
            }
        }

        return $unique;
    }

    #endregion
}
