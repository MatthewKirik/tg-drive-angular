import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DirectoryService } from 'src/app/proxy-services/directory.service';
import { DirectoryDto } from 'src/app/proxy-services/models';

@Component({
  selector: 'app-directory-tree',
  templateUrl: './directory-tree.component.html',
  styleUrls: ['./directory-tree.component.scss'],
})
export class DirectoryTreeComponent implements OnInit {
  root: TreeNode<DirectoryDto>[] = [];
  loading: boolean = false;

  constructor(private directoryService: DirectoryService) {}

  ngOnInit(): void {
    this.loadRoot();
  }

  async loadRoot() {
    this.loading = true;
    const root = await this.directoryService.getRoot();
    this.loading = false;
    this.root = root.map(this.createNode);
  }

  nodeExpand(node: TreeNode<DirectoryDto>) {
    if (node?.data?.id) {
      this.loading = true;
      this.directoryService.getChildren(node.data.id).then((children) => {
        node.children = children.map(this.createNode);
      });
      this.loading = false;
    }
  }

  private createNode(dto: DirectoryDto): TreeNode<DirectoryDto> {
    return {
      data: dto,
      label: dto.name,
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: undefined,
      leaf: false,
    };
  }
}
