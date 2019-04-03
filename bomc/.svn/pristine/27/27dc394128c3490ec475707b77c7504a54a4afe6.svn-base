//资源管理数据
const treeData = [{
	value: 'SaaS',
	label: 'SaaS',
	children: [{
		value: 'Application',
		label: '应用类',
		TypeSubId: "5",
		children: []
	}, {
		value: 'Business',
		label: '业务类',
		TypeSubId: "6",
		children: []
	}]
}, {
	value: 'PaaS',
	label: 'PaaS',
	children: [{
		value: 'Logic',
		label: '逻辑类',
		TypeSubId: "7",
		children: []
	}]
}, {
	value: 'IaaS',
	label: 'IaaS',
	children: [{
		value: 'Logic',
		label: '逻辑类',
		TypeSubId: '8',
		children: []
	}, {
		value: 'Physical',
		label: '物理类',
		TypeSubId: '9',
		children: []
	}]
}, {
	value: 'Others',
	label: '其他类',
	children: []
}];

export function treeDataHandle(res, type) {
	let temp = JSON.parse(JSON.stringify(treeData));
	let temp1 = JSON.parse(JSON.stringify(treeData));
	let alias = res;
	let arr = ['5', '6', '7', '8', '9', '10'];
	let re = []; //三、四级菜单
	let rt = [];

	//获取三级菜单数据
	alias.map((l, index) => {
		arr.map((r, idx) => {
			if (l.TypeId === r) {
				re.push({
					TypeId: l.TypeId,
					TypeSubId: l.TypeSubId,
					label: l.alias,
					value: l.name,
					children: []
				});
			}
		});
	});
	//获取四级菜单数据
	alias.map((a, index) => {
		re.map((r, idx) => {
			if (a.TypeId === r.TypeSubId) {
				r.children.push({
					TypeId: a.TypeId,
					TypeSubId: a.TypeSubId,
					label: a.alias,
					value: a.name
				});
			}
		});
	});
	if (type.length > 0) {
		temp1.map((t, index) => {
			if (t.value === type[0]) {
				rt.push(t)
			}
		});
		rt.map((t, index) => {
			t.children.map((c, idx) => {
				if (c.value !== type[1]) {
					t.children.splice(idx, 1);
				}
			})
		})
		rt[0].children.map((t, idx) => {
			if (t.value === type[1]) {
				re.map((r, idx) => {
					if (r.TypeId === t.TypeSubId && r.value === type[2]) {
						t.children = [];
						t.children.push(r)
					}
				});
			} else {
				rt[0].children.splice(idx, 1);
			}
		});
	}

	//删除无数据的四级菜单
	re.map((e, index) => {
		if (e.children.length <= 0) {
			delete e.children;
		}
	});

	//合并一、二、三、四级菜单
	temp.map((t, index) => {
		t.children.map((r, idx) => {
			re.map(item => {
				if (r.TypeSubId === item.TypeId) {
					r.children.push(item)
				}
			});
		})
	});
	//删除无数据的二、三级菜单
	temp.map((p, index) => {
		if (p.children.length <= 0) {
			delete p.children;
		} else {
			p.children.map((r, idx) => {
				if (r.children.length <= 0) {
					delete r.children;
				}
			});
		}
	});

	if (type.length > 0) {
		return rt;
	} else {
		return temp;
	}
}