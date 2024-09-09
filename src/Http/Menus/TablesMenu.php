<?php

namespace Narsil\Tables\Http\Menus;

#region USE

use Narsil\Menus\Enums\VisibilityEnum;
use Narsil\Menus\Http\Menus\AbstractMenu;
use Narsil\Menus\Models\MenuNode;

#endregion

/**
 * @version 1.0.0
 *
 * @author Jonathan Rigaux
 */
class TablesMenu extends AbstractMenu
{
    #region PUBLIC METHODS

    /**
     * @return array
     */
    public static function getBackendMenu(): array
    {
        return [
            [
                MenuNode::LABEL => 'Model comments',
                MenuNode::URL => '/backend/model-comments',
                MenuNode::VISIBILITY => VisibilityEnum::AUTH->value,
                MenuNode::RELATIONSHIP_ICON => 'lucide/message-circle-warning',
            ],
            // [
            //     MenuNode::LABEL => 'Table templates',
            //     MenuNode::URL => '/backend/table-templates',
            //     MenuNode::VISIBILITY => VisibilityEnum::AUTH->value,
            //     MenuNode::RELATIONSHIP_ICON => 'lucide/table',
            // ]
        ];
    }

    #endregion
}
