import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DirectoryService } from 'src/app/proxy-services/directory.service';
import { DirectoryDto } from 'src/app/proxy-services/models';
import { MenuItem } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';

interface Directory {
  dto: DirectoryDto;
  adding: boolean;
  parentNode?: TreeNode<Directory>;
}

@Component({
  selector: 'app-directory-tree',
  templateUrl: './directory-tree.component.html',
  styleUrls: ['./directory-tree.component.scss'],
})
export class DirectoryTreeComponent implements OnInit {
  @ViewChild('addDirectoryOverlay')
  directoryOverlay!: OverlayPanel;

  root: TreeNode<Directory>[] = [];
  loading: boolean = false;
  directoryMenu: MenuItem[];
  selectedDirectoryNode: TreeNode<Directory> = undefined!;

  constructor(private directoryService: DirectoryService) {
    this.directoryMenu = [
      {
        label: 'Add Subdirectory',
        icon: 'pi pi-plus',
        command: (x) => this.addSubdir(this.selectedDirectoryNode),
      },
      {
        label: 'Remove',
        icon: 'pi pi-times',
        command: (x) => this.removeDirectory(this.selectedDirectoryNode),
      },
    ];
  }

  ngOnInit(): void {
    this.loadRoot();
  }

  async loadRoot() {
    this.loading = true;
    const root = await this.directoryService.getRoot();
    this.loading = false;
    this.root = root.map((x) => this.createNode(x));
  }

  async addSubdir(node: TreeNode<Directory>) {
    if (!node) return;
    this.removeAllAdding();
    await this.expandNode(node);
    const tempNode = this.createNode({
      name: '',
      parentId: node.data?.dto.id,
      leaf: true,
    } as DirectoryDto, node, true);
    node.children?.unshift(tempNode);
  }

  async removeDirectory(node: TreeNode<Directory>) {
    if (!node) return;
    // TODO remove
  }

  removeAllAdding() {
    for (const rootDir of this.root) {
      this.removeNodeAdding(rootDir);
    }
  }

  removeNodeAdding(node: TreeNode<Directory>) {
    if (node.children?.length) {
      node.children = node.children.filter(x => !x.data?.adding);
      for (const child of node.children) {
        this.removeNodeAdding(child);
      }
    }
  }

  expandNode(node: TreeNode<Directory>): Promise<void> {
    node.expanded = true;
    return this.onNodeExpand(node);
  }

  onNodeExpand(node: TreeNode<Directory>): Promise<void> {
    this.loading = true;
    return this.directoryService
      .getChildren(node.data!.dto.id)
      .then((children) => {
        node.children = children.map((x) => this.createNode(x, node));
        this.loading = false;
      });
  }

  cancelAdding() {
    this.removeAllAdding();
  }

  async approveAdding(node: TreeNode<Directory>) {
    this.loading = true;
    await this.directoryService.addDirectory(node.data!.dto);
    if (!!node.data?.parentNode) {
      this.expandNode(node.data.parentNode);
    }
  }

  private createNode(
    dto: DirectoryDto,
    parent?: TreeNode<Directory>,
    adding: boolean = false
  ): TreeNode<Directory> {
    return {
      data: { dto, adding, parentNode: parent },
      label: dto.name,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: undefined,
      leaf: dto.leaf,
      key: dto.id?.toString(),
      selectable: !adding,
    };
  }
}
